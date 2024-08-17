import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import { Zone } from "./Zone";
import { ZONE_SPACE } from "../constants/Sizes";


export class ZoneContainer extends Sizer{
    

    constructor(scene : Phaser.Scene, y : number){
        super(scene, {
            x: 1920 / 2,
            y: y,
            space: {
                item: ZONE_SPACE
            },
        });

        for (let i = 0; i < 5; i++) {
            this.add(new Zone(scene, i))
        }

        this.layout();
    }

    childrenAsZones(){
        return this.getChildren().map(x => x as Zone);
    }

    getCardsWithTitle(title : string){
        return this.childrenAsZones().filter(x => x.kaiju?.title === title);
    }
}