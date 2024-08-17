import { WallStreetEat } from "../../effects/scoring_start/WallStreetEat";
import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuWallStreet extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Wall Street Eater";
        this.power = 100;
        this.mana = 1;
        this.size = 2;
        this.sprite = "kaiju_sea_wall_street"

        this.description = `Causes $${this.power} of property damage at the start of scoring for each turn.`
        
        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        game.preScoreEffects.push(new WallStreetEat(this.power))
        await this.flashScoreLabel('Looking for Wall Streeters...')
    }
}