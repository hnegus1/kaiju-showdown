import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import type { Zone } from "./Zone";
import { ZONE_SPACE } from "../constants/Sizes";
import type { KaijuShell } from "../model/KaijuShell";
import { KaijuStatus } from "../enums/KaijuStatus";


export class RecruitmentStation extends Sizer{
    

    constructor(scene : Phaser.Scene, y : number, shells : KaijuShell[]){
        super(scene, {
            x: 1920 / 2,
            y: y,
            space: {
                item: ZONE_SPACE
            },
        });

        for (const iterator of shells) {
            const kj = iterator.invoke(this.scene)
            kj.status = KaijuStatus.Recruiting;
            this.add(kj)
        }

        this.layout();
    }

    invokeShell(shell : KaijuShell){
        const kj = shell.invoke(this.scene)
        kj.status = KaijuStatus.Recruiting;
        this.add(kj)

        this.layout();
    }
}