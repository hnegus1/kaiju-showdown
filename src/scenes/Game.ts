import { Scene } from 'phaser';
import { ZoneContainer } from '../entities/ZoneContainer';
import { Hand } from '../entities/Hand';
import { InitInputService, InputService } from '../state/InputState';
import type Kaiju from '../entities/Kaiju';
import { InitMiscStateService, MiscStateService } from '../state/MiscState';
import { KaijuStatus } from '../enums/KaijuStatus';
import { Score } from '../entities/Score';
import { TurnScore } from '../entities/TurnScore';
import { EndTurn } from '../entities/Ui/EndTurn';
import type { Zone } from '../entities/Zone';
import { sleep } from '../helpers/AsyncHelper';
import { STARTING_TURN } from '../constants/Misc';
import { YouWinMessage } from '../entities/YouWinMessage';
import type { Effect } from '../effects/Effect';
import { RecruitmentStation } from '../entities/RecruitmentStation';
import { getRandomInt } from '../helpers/RandomHelper';
import { RestartButton } from '../entities/Ui/RestartButton';
import { InitPoolStateService, PoolStateService } from '../state/PoolState';
import { LEVEL_SCALING } from '../constants/Scaling';
import { InitSpawnSoundService } from '../state/SpawnSoundService';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    playerZoneContainer : ZoneContainer;
    score : Score;
    turnScore : TurnScore;
    hand : Hand;

    level : number;

    kaijuCrushedIt : YouWinMessage;

    endTurnButton : EndTurn;

    turnScoreVal : number;
    scoreVal : number;
    turnVal : number;
    targetVal : number;

    preScoreEffects : Effect[]
    postScoreEffects : Effect[]
    handEffects : Effect[]

    genericScoringLabel : Phaser.GameObjects.Text | null;

    recruitment : RecruitmentStation;

    bg : Phaser.GameObjects.Sprite;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.bg = this.add.sprite(1920 / 2, 1080 / 2, "BG");
        this.bg.setOrigin(0.5);

        InitPoolStateService();
        InitInputService();
        InitMiscStateService();
        InitSpawnSoundService();

        this.level = 1;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xffffff);

        this.playerZoneContainer = new ZoneContainer(this, 1080 *.45);
        
        this.turnScoreVal = 0;
        this.scoreVal = 0;
        this.targetVal = 120;
        this.turnVal = STARTING_TURN;
        
        this.handEffects = []
        this.hand = new Hand(this);

        this.score = new Score(this);

        this.turnScore = new TurnScore(this);

        this.endTurnButton = new EndTurn(this);


        this.recruitment = new RecruitmentStation(this, 1080 * .5, []);

        this.preScoreEffects = [];
        this.postScoreEffects = [];

        this.hand.drawForTurn();
    }

    processKaijuDragEnd(kaiju : Kaiju){
        if(MiscStateService.hoveredZone?.canPlayKaiju(kaiju)){
            kaiju.orphan();
            MiscStateService.hoveredZone.playKaiju(kaiju);
            this.sound.play("sound_pop", {rate: .7})
        }else if(kaiju.status === KaijuStatus.OnField){
            //add back to hand
            kaiju.orphan();
            kaiju.status = KaijuStatus.InHand;
            this.hand.getSizer().add(kaiju, {expand: true});
        }

        this.hand.getSizer().layout();
        this.hand.layout();
        InputService.setDragging(false);
        MiscStateService.draggedKaiju = null;    
        MiscStateService.hoveredZone = null;

        //show end turn button if kaijus are real
        this.endTurnButton.visible = this.playerZoneContainer.getChildren().map(x => x as Zone).some(x => x.kaiju)
    }

    setTurnScore(val : number){
        this.turnScoreVal = val;
        this.turnScore.text.text = `$${val}`;
    }

    incrementScore(val : number){
        this.scoreVal += val;
        this.score.currentScore.setScore(this.scoreVal);
    }

    decrementTurn(){
        this.turnVal--;
        this.score.turnTimer.setTurn(this.turnVal);
    }


    async passTurn(){
        //TODO lock input
        this.endTurnButton.visible = false;

        this.turnScore.visible = true;

        await sleep(800);

        //pre effects
        for (const effect of this.preScoreEffects) {
            await effect.tap(this);
            await sleep(400);
        }
        if(this.preScoreEffects.length > 0) await sleep(800);

        for (const zone of this.playerZoneContainer.childrenAsZones()) {
            await zone.kaiju?.tap()
            if(zone.kaiju){
                await sleep(400);
            }
        }
        

        
        this.incrementScore(this.turnScoreVal);
        this.turnScoreVal = 0;
        
        await sleep(800);

        //post effects
         for (const effect of this.postScoreEffects) {
            await effect.tap(this);
            await sleep(400);
        }
        if(this.postScoreEffects.length > 0) await sleep(800);

        this.turnScore.visible = false;

        //kill the hand first
        for (const kaiju of this.hand.getKaijusInHand()) {
            kaiju.orphan();
            kaiju.destroy();
        }
        this.hand.layout();
        
        //kill board kaijus
        for (const zone of this.playerZoneContainer.childrenAsZones()) {
            const kaiju = zone.kaiju;
            kaiju?.orphan();
            kaiju?.destroy();
        }

        //check if won
        if(this.scoreVal >= this.targetVal){
            this.sound.play("sound_drumroll")
            this.playerZoneContainer.visible = false;
            this.score.sizer.visible = false;
            await sleep(2000)
            this.kaijuCrushedIt = new YouWinMessage(this);
            this.sound.play("sound_tadaa")
            await sleep(2000);
            this.kaijuCrushedIt.text.text = "Select a Kaiju to recruit (will add multiple copies)"
            this.recruitmentsRemaining = 3;
            await this.initRecruit();
            return;
        }
        //new turn
        this.decrementTurn();
        
        //check if lost
        if(this.turnVal === 0){
            this.sound.play("sound_drumroll")
            this.playerZoneContainer.visible = false;
            this.score.sizer.visible = false;
            await sleep(2000)
            this.sound.play("sound_sad_trombone")
            this.kaijuCrushedIt = new YouWinMessage(this, "Kaiju Crushed!! :(");
            await sleep(2000);
            new RestartButton(this);            
            return;
        }
        
        await sleep(800);

        //draw cards
        await this.hand.drawForTurn();

        this.setTurnScore(0);
    }

    async flashScoreLabel(val : string){
        this.genericScoringLabel = this.add.text(1920 / 2, 1080 * 0.2, val);
        this.genericScoringLabel.setFontSize(32);
        this.genericScoringLabel.setColor("black");
        this.genericScoringLabel.setFontFamily("ccmonstermash");
        this.genericScoringLabel.setDepth(100);
        this.genericScoringLabel.setOrigin(0.5, 0.5);

    
        const y = this.genericScoringLabel.y
        await new Promise<void>((resolve) => {
            this.add.tween({
                targets: [this.genericScoringLabel],
                y: y - 100,
                duration: 400,
                delay: 0,
                opacity: 0,
                ease: 'Linear',
                onComplete: () => {
                    this.genericScoringLabel?.destroy()
                    resolve();
                }
            })
        })
        
        this.genericScoringLabel = null;
    }

    recruitmentsRemaining : number
    async initRecruit(){
        this.recruitmentsRemaining--;
        this.recruitment.removeAll(true);

        
        
        if(this.recruitmentsRemaining === 1){
            await sleep(800);
            
            this.kaijuCrushedIt.text.text = "And another one!"
            
        }

        if(this.recruitmentsRemaining === 0){
            await this.reset()
        }else{
            const size1Index = getRandomInt(PoolStateService.RECRUITABLE_KAIJUS_SIZE_1().length)
            const size2Index = getRandomInt(PoolStateService.RECRUITABLE_KAIJUS_SIZE_2().length)
            const size3Index = getRandomInt(PoolStateService.RECRUITABLE_KAIJUS_SIZE_3().length)
    
            if(PoolStateService.RECRUITABLE_KAIJUS_SIZE_1().length > 1)
                this.recruitment.invokeShell(PoolStateService.RECRUITABLE_KAIJUS_SIZE_1()[size1Index])
            if(PoolStateService.RECRUITABLE_KAIJUS_SIZE_2().length > 1)
                this.recruitment.invokeShell(PoolStateService.RECRUITABLE_KAIJUS_SIZE_2()[size2Index])
            if(PoolStateService.RECRUITABLE_KAIJUS_SIZE_3().length > 1)
                this.recruitment.invokeShell(PoolStateService.RECRUITABLE_KAIJUS_SIZE_3()[size3Index])
        }
    }

    async reset(){
        this.level++;
        const scaling = this.level >= LEVEL_SCALING.length ? LEVEL_SCALING[LEVEL_SCALING.length - 1] : LEVEL_SCALING[this.level] 
        this.score.reset(scaling)
        this.postScoreEffects = []
        this.preScoreEffects = []
        this.handEffects = []

        this.setTurnScore(0);
        this.scoreVal = 0;
        this.targetVal = (scaling);
        this.turnVal = STARTING_TURN;
        
        await sleep(400)
        this.kaijuCrushedIt.destroy();

        await sleep(400)
        this.score.sizer.visible = true;
        await sleep(400)
        this.playerZoneContainer.visible = true;


        await this.hand.drawForTurn();
    }

    restart(){
        this.scene.restart();
    }
}
