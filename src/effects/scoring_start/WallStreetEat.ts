import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import { Effect } from "../Effect";



export class WallStreetEat extends Effect{
    val : number


    constructor(val : number){
        super();
        this.val = val;
    }

    async tap(scene : Phaser.Scene){
        const gameScene = GetSceneAsGame(scene);
        gameScene.setTurnScore(gameScene.turnScoreVal + this.val);
        await gameScene.flashScoreLabel(`Wall Streeter Eaten! (+$${this.val})`)
    }
}