import Kaiju from "../Kaiju";


export class KaijuSeaRegular extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Sea Kaiju";
        this.power = 20;
        this.size = 2;
        this.sprite = "kaiju_sea_regular"
        
        this.create();
    }
}