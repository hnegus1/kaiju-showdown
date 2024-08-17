import Kaiju from "../Kaiju";


export class KaijuSeaLeviathan extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Leviathan";
        this.power = 40;
        this.size = 3;
        this.sprite = "kaiju_sea_leviathan"
        
        this.create();
    }
}