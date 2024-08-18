import Kaiju from "../Kaiju";


export class KaijuSeaBaby extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Li'l Baby";
        this.power = 5;
        this.size = 1;
        this.sprite = "kaiju_sea_baby"
        
        this.create();
    }
}