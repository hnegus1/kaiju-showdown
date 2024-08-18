import { KaijuStatus } from "../../enums/KaijuStatus";
import { getRandomInt } from "../../helpers/RandomHelper";
import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";
import type { Zone } from "../Zone";


export class KaijuPufferFish extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Puffer Fish";
        this.power = 300;
        this.size = 1;
        this.sprite = "kaiju_sea_pufferfish"
        this.description = `If not next to a Kaiju, cause $${this.power} of property damage`;

        this.create();
    }

    async tap(){
        if(this.status === KaijuStatus.InHand){
            await this.flashScoreLabel('Next to a Kaiju! :(', 1000, "sound_nuh_uh")
            return;
        }

        const game = GetSceneAsGame(this.scene);
        const zone = this.getParent() as Zone;
        
        if(zone.kaijusAreAdjacent()){
            await this.flashScoreLabel('Next to a Kaiju! :(', 1000, "sound_nuh_uh")
        }else{
            game.setTurnScore(game.turnScoreVal + this.power);
            await this.flashScoreLabel(`+${this.power}`)
        }
    }
}