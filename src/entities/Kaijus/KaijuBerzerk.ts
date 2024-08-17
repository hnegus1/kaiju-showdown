import { BerzerkEffect } from "../../effects/scoring_end/BerzerkEffect";
import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuBerzerk extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Berserk";
        this.power = 0;
        this.size = 3;
        this.sprite = "kaiju_sea_berzerk"
        this.description = '10x score at the end of scoring on your last turn';

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        game.postScoreEffects.push(new BerzerkEffect())
        await this.flashScoreLabel('Getting angry...')
    }
}