import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import type KaijuType from "../model/KaijuType";
import { KaijuStatus } from "../enums/KaijuStatus";
import { CARD_HEIGHT, CARD_WIDTH, ZONE_SPACE } from "../constants/Sizes";
import type { Hand } from "./Hand";
import { InputService } from "../state/InputState";
import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import { GetSceneAsGame } from "../helpers/SceneHelpers";
import { MiscStateService } from "../state/MiscState";
import type Container from "phaser3-rex-plugins/templates/ui/container/Container";
import type { Zone } from "./Zone";
import { sleep } from "../helpers/AsyncHelper";
import { PoolStateService } from "../state/PoolState";
import { COLOUR_WHITE } from "../constants/Colours";

export default class Kaiju extends ContainerLite{
    title : string;
    power : number;
    mana : number;
    sprite : string;
    description : string;

    size : number;

    kaijuType : KaijuType;
    status : KaijuStatus

    cardBack : Phaser.GameObjects.Rectangle
    titleLabel : Phaser.GameObjects.Text;
    descriptionLabel : Phaser.GameObjects.Text;
    manaLabel : Phaser.GameObjects.Text;
    elementalLabel : Phaser.GameObjects.Rectangle;
    image : Phaser.GameObjects.Sprite

    scoreLabel : Phaser.GameObjects.Text | null;


    private getCardWidth(){
        return (CARD_WIDTH * this.size) + (ZONE_SPACE * (this.size - 1))
    }

    create(){
        const cardWidth = this.getCardWidth();

        this.status = KaijuStatus.InHand;

        this.setOrigin(0.5);

        this.width = cardWidth;
        this.height = CARD_HEIGHT; 

        this.cardBack = this.scene.add.rectangle(0, 0, cardWidth, CARD_HEIGHT, COLOUR_WHITE, 1);
        this.cardBack.setStrokeStyle(4, 0x000000);

        this.image = this.scene.add.sprite(0, 0, this.sprite);
        
        this.titleLabel = this.scene.add.text(0, ((CARD_HEIGHT / 2) * -1) + 50, this.title);
        this.titleLabel.setFontFamily("ccmonstermash");
        this.titleLabel.setFontSize(32);
        this.titleLabel.setWordWrapWidth(cardWidth - 30)
        this.titleLabel.setAlign("center");
        this.titleLabel.setColor("black");
        this.titleLabel.setOrigin(0.5, 0.5)
        
        this.descriptionLabel = this.scene.add.text(0, (CARD_HEIGHT / 2) - 60, this.description ?? `Causes $${this.power} of property damage`)
        this.descriptionLabel.setWordWrapWidth(cardWidth - 30)
        this.descriptionLabel.setOrigin(0.5, 0.5)
        this.descriptionLabel.setColor("black");
        this.descriptionLabel.setFontFamily("deva-ideal");
        this.descriptionLabel.setAlign("center");

        // this.manaLabel = this.scene.add.text(0, (CARD_HEIGHT / 2) - 30, `MANA COST: ${this.mana}`)
        // this.manaLabel.setOrigin(0.5, 0.5)
        // this.manaLabel.setColor("black");

        // this.depth = 10;

        this.pinLocal(this.cardBack);
        this.pinLocal(this.image);
        this.pinLocal(this.titleLabel);
        this.pinLocal(this.descriptionLabel);
        // this.pinLocal(this.manaLabel);

        this.cardBack.setInteractive();
        this.scene.input.setDraggable(this.cardBack);

        
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        this.cardBack.addListener(Phaser.Input.Events.GAMEOBJECT_DRAG, async (ev : any) => {
            this.onDrag(ev)
        })
        this.cardBack.addListener(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => {
            this.onDragStart();
        })
        this.cardBack.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, async () => this.onPointerOver())
        this.cardBack.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, async () => this.onPointerOut())
        this.cardBack.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, async () => this.onPointerUp())
        this.cardBack.addListener(Phaser.Input.Events.GAMEOBJECT_DRAG_END, async () => {
            this.onDragEnd();
        })
    }

    orphan(){
        if(this.status === KaijuStatus.InHand){
            (this.getParent() as Sizer).remove(this, false);
        }

        if(this.status === KaijuStatus.OnField){
            const parent = this.getParent() as Zone;
            parent.unpin(this);
            parent.kaiju = null;
        }
    }


    async tap(){
        console.log("is a base Kaiju so just bumping power");
        
        const game = GetSceneAsGame(this.scene);
        game.setTurnScore(game.turnScoreVal + this.power);
        await this.flashScoreLabel(`+${this.power}`)
    }

    async flashScoreLabel(val : string, sleepy = 0, sound = "sound_money"){
        this.scoreLabel = this.scene.add.text(this.getCardWidth() / 2, ((CARD_HEIGHT / 2) * -1) - 20, val);
        this.scoreLabel.setFontSize(32);
        this.scoreLabel.setFontFamily("ccmonstermash");
        this.scoreLabel.setColor("black");
        this.scoreLabel.setDepth(100);
        this.scoreLabel.setOrigin(0.5, 0.5);

        this.pinLocal(this.scoreLabel);
        this.scene.sound.play(sound)

        const y = this.scoreLabel.y
        await new Promise<void>((resolve) => {
            this.scene.add.tween({
                targets: [this.scoreLabel],
                y: y - 100,
                duration: sleepy === 0 ? 800 : sleepy,
                delay: 0,
                opacity: 0,
                ease: 'Linear',
                onComplete: () => {
                    this.scoreLabel?.destroy()
                    resolve();
                }
            })
        })
        
        this.scoreLabel = null;
    }


    //Events
    onPointerOver(){
        this.scene.input.setDefaultCursor("pointer");
    }
    
    onPointerOut(){
        this.scene.input.setDefaultCursor("default");
    }

    onPointerUp(){
        if(this.status === KaijuStatus.Recruiting){
            //recruit
            const shellEntry = PoolStateService.RECRUITABLE_KAIJUS.filter(x => x.title === this.title)[0];
            PoolStateService.PLAYABLE_KAIJUS.push(shellEntry);
            PoolStateService.RECRUITABLE_KAIJUS.splice(PoolStateService.RECRUITABLE_KAIJUS.indexOf(shellEntry), 1);

            GetSceneAsGame(this.scene).initRecruit()

        }
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onDrag(ev : any){
        if(this.status !== KaijuStatus.Recruiting){
            InputService.setDragging(true);
            MiscStateService.draggedKaiju = this;
            
            this.x = ev.x;
            this.y = ev.y + (CARD_HEIGHT / 2) + 40;
        }
    }

    onDragStart(){
        if(this.status !== KaijuStatus.Recruiting){
            this.scene.sound.play("sound_pop", {rate: 1.8})
        }
    }
    
    onDragEnd(){       
        GetSceneAsGame(this.scene).processKaijuDragEnd(this);
    }
}