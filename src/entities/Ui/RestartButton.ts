import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import { GetSceneAsGame } from "../../helpers/SceneHelpers";
import type { Rectangle } from "phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms";
import type Label from "phaser3-rex-plugins/templates/ui/label/Label";
import { COLOUR_WHITE, COLOUR_BLACK } from "../../constants/Colours";

export class RestartButton extends ContainerLite{
    
    label : Label

    text : Text;
    background : Rectangle

    constructor(scene : Phaser.Scene){
        super(scene, 1920 / 2, 1080 * 0.5);

        const background = this.scene.add.rectangle(0, 0, 0, 0, COLOUR_WHITE);
        background.setStrokeStyle(3, COLOUR_BLACK);
        background.depth = 4

        const text = this.scene.add.text(0, 0, 'Try again!');
        text.setFontSize(48)
        text.depth = 5
        text.setFontFamily("ccmonstermash");
        text.setOrigin(0.5);
        text.setColor("black");

        this.label = scene.rexUI.add.label({
            x: 0,
            y: 0,
            origin: 0.5,
            text: text,
            background: background,
            space: {bottom: 40, top: 40, left: 30, right: 30}
        })

        this.pinLocal(this.label);
        this.label.layout();

        this.height = this.label.height;

        this.label.setInteractive();
        this.label.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, async () => this.onPointerOver())
        this.label.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, async () => this.onPointerOut())

        this.label.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, async () => await this.onClick())

    }

    //Events
    onPointerOver(){
        this.scene.input.setDefaultCursor("pointer");
    }
    
    onPointerOut(){
        this.scene.input.setDefaultCursor("default");
    }

    async onClick(){
        GetSceneAsGame(this.scene).restart();
    }
}