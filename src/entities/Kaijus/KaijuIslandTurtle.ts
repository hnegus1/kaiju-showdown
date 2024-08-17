import { TurtleHandEffect } from "../../effects/hand/TurtleHandEffect";
import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuIslandTurtle extends Kaiju{
    constructor(scene: Phaser.Scene){
        super(scene);

        this.title = "Island Turtle";
        this.power = 0;
        this.size = 2;
        this.sprite = "kaiju_sea_island_turtle"
        this.description = "Draw twice the total size of cards next turn. (Doesn't stack)";

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);
        
        if(game.handEffects.length > 0){
            await this.flashScoreLabel("it doesn't stack, you shouldn't play two of these, play something else instead", 3000)
        }else{
            game.handEffects.push(new TurtleHandEffect(0));
            await this.flashScoreLabel("picking the FINEST cards for you :)", 800)
        }
    }
}