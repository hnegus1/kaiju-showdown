import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import type Kaiju from "./Kaiju";
import { CARD_HEIGHT, CARD_WIDTH, TOTAL_ZONES, ZONE_SPACE } from "../constants/Sizes";
import { InputService } from "../state/InputState";
import { COLOUR_BLACK, COLOUR_GREEN, COLOUR_RED, COLOUR_SEA } from "../constants/Colours";
import { MiscStateService } from "../state/MiscState";
import { KaijuStatus } from "../enums/KaijuStatus";
import { GetZoneContainer } from "../helpers/SceneHelpers";



export class Zone extends ContainerLite{

    rect : Phaser.GameObjects.Rectangle;

    kaiju : Kaiju | null;

    zoneIndex : number

    constructor(scene : Phaser.Scene, ind : number){
        super(scene);

        this.zoneIndex = ind;

        this.rect = scene.add.rectangle(0, 0, CARD_WIDTH, CARD_HEIGHT, 0x000000, 0)
        this.rect.setStrokeStyle(4, 0x000000);

        this.pinLocal(this.rect);

        this.width = this.rect.width;
        this.height = this.rect.height;

        this.rect.setInteractive();
        this.rect.addListener(Phaser.Input.Events.POINTER_OVER, async () => {
            this.onMouseOver();
        })

        this.rect.addListener(Phaser.Input.Events.POINTER_OUT, async () => {
            this.onMouseOut();
        })

    }

    canPlayKaiju(kaijuToPlay : Kaiju){
        if(this.kaiju === kaijuToPlay) return true // it's the same? hopefully? 😨
        if(this.kaiju) return false;//occupied!

        //depending on size
        const zonesToCheck = kaijuToPlay.size - 1
        if(this.zoneIndex + zonesToCheck >= TOTAL_ZONES) return false;//will go off the end
        const container = GetZoneContainer(this.scene);
        const containerChildren = container.getChildren();
        
        for (let i = this.zoneIndex; i <= this.zoneIndex + zonesToCheck; i++) {
            const element = containerChildren[i] as Zone
            if(element.kaiju) return false;
        }

        return true;
    }

    playKaiju(kaijuToPlay : Kaiju){
        this.kaiju = kaijuToPlay;
        this.kaiju.changeOrigin(0, 0.5);
        // this.kaiju.x = 0 + (CARD_WIDTH / 2 * (this.kaiju.size - 1) + (ZONE_SPACE * (this.kaiju.size - 1)));
        this.kaiju.x = 0 - CARD_WIDTH / 2;
        this.kaiju.y = 0;
        this.kaiju.status = KaijuStatus.OnField;
        this.pinLocal(this.kaiju);
    }


    getAdjacentZones(){
        if(this.zoneIndex === 0) return [GetZoneContainer(this.scene).getChildren()[1] as Zone];
        if(this.zoneIndex === 4) return [GetZoneContainer(this.scene).getChildren()[3] as Zone];

        const container = GetZoneContainer(this.scene).childrenAsZones();
        return [container[this.zoneIndex - 1] as Zone, container[this.zoneIndex + 1] as Zone];
    }

    private setHovered(hovered : boolean){
        this.rect.strokeColor = hovered ? (this.canPlayKaiju(MiscStateService.draggedKaiju as Kaiju) ? COLOUR_GREEN : COLOUR_RED) : COLOUR_BLACK
    }

    //events
    onMouseOver(){
        if(InputService.isDragging()){
            this.setHovered(true)
            MiscStateService.hoveredZone = this;
        }
    }

    onMouseOut(){
        this.setHovered(false);
        MiscStateService.hoveredZone = null;
    }
}