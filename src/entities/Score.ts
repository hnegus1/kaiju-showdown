import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import { ScoreTarget } from "./Ui/ScoreTarget";
import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import { CurrentScore } from "./Ui/CurrentScore";
import { TurnTimer } from "./Ui/TurnTimer";



export class Score extends ContainerLite{
    sizer : Sizer

    scoreTarget : ScoreTarget
    currentScore : CurrentScore
    turnTimer : TurnTimer

    constructor(scene : Phaser.Scene){
        super(scene, 0, 0);

        this.changeOrigin(0, 0);

        this.sizer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: {
                left: 30,
                top: 10,
                item: 10
            },
            originX: 0,
            originY: 0
        })

        this.scoreTarget = new ScoreTarget(this.scene, 120);
        this.sizer.add(this.scoreTarget);
        
        this.currentScore = new CurrentScore(this.scene, 0);
        this.sizer.add(this.currentScore);

        this.turnTimer = new TurnTimer(this.scene, 4);
        this.sizer.add(this.turnTimer);

        this.sizer.layout();

    }

    reset(target : number){
        this.scoreTarget.setVal(target);

        this.currentScore.setScore(0);
        this.turnTimer.setTurn(4);

        
    }
}