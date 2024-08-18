import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";

export class TurnScore extends ContainerLite{
    text : Phaser.GameObjects.Text;

    constructor(scene : Phaser.Scene){
        super(scene, 1920 / 2, 1080 * 0.2)
        this.text = this.scene.add.text(0, 0, "0")
        this.text.setColor("black");
        this.text.setFontFamily("ccmonstermash");
        this.text.setOrigin(0.5);
        this.text.setFontSize(48);


        this.pinLocal(this.text)

        this.visible = false;
    }

    
}