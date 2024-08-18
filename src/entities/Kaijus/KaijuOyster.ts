import { getRandomInt } from "../../helpers/RandomHelper";
import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuOyster extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Oyster";
        this.power = 5;
        this.size = 1;
        this.sprite = "kaiju_sea_oyster"
        this.description = "1 in 2 chance to multiply accumulated score by 5";

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        const rand = getRandomInt(2);
        if(rand === 0){
            game.setTurnScore(game.turnScoreVal * this.power);
            await this.flashScoreLabel(`Found a pearl! x${this.power}`)
        }else{
            await this.flashScoreLabel('No pearl :(', 800, "sound_nuh_uh")
        }
    }
}