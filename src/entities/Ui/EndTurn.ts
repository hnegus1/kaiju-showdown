import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import type { Rectangle } from "phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms";
import type Label from "phaser3-rex-plugins/templates/ui/label/Label";
import { COLOUR_BLACK, COLOUR_WHITE } from "../../constants/Colours";
import { GetSceneAsGame } from "../../helpers/SceneHelpers";



export class EndTurn extends ContainerLite{

    label : Label

    text : Text;
    background : Rectangle

    constructor(scene : Phaser.Scene){
        super(scene, 160, 1080 * 0.45);

        const background = this.scene.add.rectangle(0, 0, 0, 0, COLOUR_WHITE);
        background.setStrokeStyle(3, COLOUR_BLACK);
        background.depth = 4

        const text = this.scene.add.text(0, 0, 'Play Kaijus');
        text.depth = 5
        text.setFontFamily("ccmonstermash");
        text.setFontSize(24);
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

        this.visible = false;
    }

    //Events
    onPointerOver(){
        this.scene.input.setDefaultCursor("pointer");
    }
    
    onPointerOut(){
        this.scene.input.setDefaultCursor("default");
    }

    async onClick(){
        await GetSceneAsGame(this.scene).passTurn();
    }
    
}