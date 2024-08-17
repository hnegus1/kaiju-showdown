import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import { Effect } from "../Effect";


export class TurtleHandEffect extends Effect{
    val : number


    constructor(val : number){
        super();
        this.val = val;
    }

    async tap(scene : Phaser.Scene){
        //don't do anything actually handled by..er.....hand
    }
}