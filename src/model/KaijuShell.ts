import type Kaiju from "../entities/Kaiju";

export interface KaijuShell{
    size : number,
    invoke : (scene : Phaser.Scene) => Kaiju,
    title : string
}