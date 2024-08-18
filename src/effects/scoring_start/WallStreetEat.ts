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
        scene.sound.play("sound_scream");
        await gameScene.flashScoreLabel(`Wall Streeter Eaten! (+$${this.val})`)
    }
}