import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import { Effect } from "../Effect";


export class BerzerkEffect extends Effect{
    async tap(scene : Phaser.Scene){
        const gameScene = GetSceneAsGame(scene);
        if(gameScene.turnVal === 1){
            gameScene.setTurnScore(gameScene.turnScoreVal * 10);
            scene.sound.play("sound_roar")
            await gameScene.flashScoreLabel('Berzerk! (x10)')
        }else{
            await gameScene.flashScoreLabel('Still getting angry...')
        }
    }
}