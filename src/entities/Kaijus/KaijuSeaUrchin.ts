import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuSeaUrchin extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Sea Urchin";
        this.power = 2;
        this.mana = 1;
        this.size = 1;
        this.sprite = "kaiju_sea_urchin"

        this.description = `Multiplies accumulated property damage this turn by ${this.power}`
        
        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        game.setTurnScore(game.turnScoreVal * this.power);
        await this.flashScoreLabel(`x${this.power}`)
    }
}