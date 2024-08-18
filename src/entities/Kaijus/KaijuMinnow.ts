import { KaijuStatus } from "../../enums/KaijuStatus";
import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";
import type { Zone } from "../Zone";


export class KaijuMinnow extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Minnow";
        this.power = 50;
        this.size = 1;
        this.sprite = "kaiju_sea_minnow"
        this.description = `Cause $${this.power} of property damage. Multiplied by the number of minnows in play.`;

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);

        const minnows = this.status === KaijuStatus.InHand ? GetSceneAsGame(this.scene).hand.getKaijusInHand().filter(x => x.title === this.title) : GetZoneContainer(this.scene).getCardsWithTitle(this.title);
        const totalPower = (this.power * minnows.length)
        game.setTurnScore(game.turnScoreVal + totalPower);
        await this.flashScoreLabel(`+$${totalPower} (${this.power} x ${minnows.length})`)
    }
}