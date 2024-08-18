import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuDealCloser extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "The Deal Closer";
        this.power = 2;
        this.size = 3;
        this.sprite = "kaiju_sea_deal_closer"
        this.description = "Doubles your current total property damage (excluding accumulated property damage this turn)";

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        game.incrementScore(game.scoreVal);
        await this.flashScoreLabel("Deal closed! (x2 total score)")
    }
}