import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import type { Rectangle } from "phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms";
import type Label from "phaser3-rex-plugins/templates/ui/label/Label";
import { COLOUR_BLACK, COLOUR_WHITE } from "../../constants/Colours";



export class CurrentScore extends ContainerLite{

    label : Label

    text : Phaser.GameObjects.Text;
    background : Rectangle

    constructor(scene : Phaser.Scene, startingValue : number){
        super(scene, 0, 0);

        const background = this.scene.add.rectangle(0, 0, 0, 0, COLOUR_WHITE);
        background.setStrokeStyle(3, COLOUR_BLACK);
        background.depth = 4

        this.text = this.scene.add.text(0, 0, `CURRENT: $${startingValue}`);
        this.text.depth = 5
        this.text.setOrigin(0);
        this.text.setColor("black");

        this.label = scene.rexUI.add.label({
            x: 0,
            y: 0,
            origin: 0,
            text: this.text,
            background: background,
            space: {bottom: 10, top: 10, left: 30, right: 30}
        })

        this.pinLocal(this.label);
        this.label.layout();

        this.height = this.label.height;
    }

    setScore(val : number){
        this.text.text = `CURRENT: $${val}`
    }
    
}