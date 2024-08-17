import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuBigBarracuda extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Big Barracuda";
        this.power = 50;
        this.size = 2;
        this.sprite = "kaiju_sea_big_barracuda"
        this.description = `Cause $${this.power} of property damage. Multiplied by the number of Kaijus in hand.`;

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        const totalCardsInHand = game.hand.getKaijusInHand().length;
        const totalPower = (this.power * totalCardsInHand)
        game.setTurnScore(game.turnScoreVal + totalPower);
        await this.flashScoreLabel(`+$${totalPower} (${this.power} x ${totalCardsInHand})`)
    }
}