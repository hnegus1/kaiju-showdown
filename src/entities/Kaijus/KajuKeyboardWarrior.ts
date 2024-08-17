import { BerzerkEffect } from "../../effects/scoring_end/BerzerkEffect";
import { KaijuStatus } from "../../enums/KaijuStatus";
import { sleep } from "../../helpers/AsyncHelper";
import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuKeyboardWarrior extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Keyboard Warrior";
        this.power = 0;
        this.size = 3;
        this.sprite = "kaiju_sea_keyboard_warrior"
        this.description = 'Set accumulated score to zero. Kill all other Kaijus in play. Play your hand instead.';

        this.create();
    }

    async tap(){
        if(this.status === KaijuStatus.InHand){
            return;//NOPE.
        }

        const game = GetSceneAsGame(this.scene);
        game.setTurnScore(0);
        await this.flashScoreLabel('Resetting score...')
        await sleep(200)
        await this.flashScoreLabel('Killing Kaijus...')
        const hand = GetZoneContainer(this.scene).childrenAsZones().filter(x => x.kaiju !== null && x.kaiju !== this).map(x => x.kaiju)
        for (const card of hand) {
            if(card){
                card.orphan();
                card.destroy();
                await sleep(200);
            }
        }
        await sleep(200)
        await this.flashScoreLabel('Playing hand...')

        for (const kaiju of GetSceneAsGame(this.scene).hand.getKaijusInHand()) {
            await kaiju.tap()
            await sleep(400);
        }

    }
}