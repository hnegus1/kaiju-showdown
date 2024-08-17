import type Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import type Kaiju from "./Kaiju";
import { KaijuSeaRegular } from "./Kaijus/KaijuSeaRegular";
import { KaijuSeaLeviathan } from "./Kaijus/KaijuSeaLeviathan";
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite";
import ScrollablePanel from "phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel";
import { COLOUR_BLACK, COLOUR_GREEN, COLOUR_GREY, COLOUR_WHITE } from "../constants/Colours";
import { CARD_HEIGHT } from "../constants/Sizes";
import Container from "phaser3-rex-plugins/templates/ui/container/Container";
import type GridSizer from "phaser3-rex-plugins/templates/ui/gridsizer/GridSizer";
import { getRandomInt } from "../helpers/RandomHelper";
import { sleep } from "../helpers/AsyncHelper";
import { KaijuOyster } from "./Kaijus/KaijuOyster";
import { KaijuPufferFish } from "./Kaijus/KaijuPufferFish";
import { KaijuMinnow } from "./Kaijus/KaijuMinnow";
import { KaijuWallStreet } from "./Kaijus/KaijuWallStreetEater";
import { KaijuBigBarracuda } from "./Kaijus/KaijuBigBarracuda";
import { GetSceneAsGame } from "../helpers/SceneHelpers";
import { KaijuIslandTurtle } from "./Kaijus/KaijuIslandTurtle";
import { KaijuSkyScraperSnacker } from "./Kaijus/KaijuSkyScraperSnacker";
import { KaijuDealCloser } from "./Kaijus/KaijuDealCloser";
import { KaijuBerzerk } from "./Kaijus/KaijuBerzerk";
import { KaijuSeaSerpent } from "./Kaijus/KaijuSeaSerpent";
import { PoolStateService } from "../state/PoolState";




export class Hand extends ScrollablePanel{

    startingHand : Kaiju[]

    sizer : Sizer;


    constructor(scene : Phaser.Scene){
        super(scene, {
            x: 0,
            y: 1080,
            width: 1920,
            height: CARD_HEIGHT,
            originX: 0,
            originY: 1,
            space: {
                left: 20,
                right: 20,
                bottom: 20,
                panel: 20,
                sliderY: 30
            },
            scrollMode: 1,
            panel: {
                child: createPanel(scene, [
                ])
            },
            slider: {
                track: scene.rexUI.add.roundRectangle(0, 30, 20, 10, 10, COLOUR_GREY),
                thumb: createScroller(scene),
                hideUnscrollableSlider: true,
                adaptThumbSize: true,
                minThumbSize: 100,
            },
            // background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOUR_GREEN),
            scroller: false,
        });

        
        this.getSizer().layout();
        this.layout();
        this.drawForTurn();

    }

    
    getSizer(){
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        return ((this.getChildren()[0] as GridSizer).getChildren().filter(x => x.type === "rexScrollableBlock")[0] as unknown as any).child as Sizer
    }

    getKaijusInHand(){
        return this.getSizer().getChildren().map(x => x as Kaiju);
    }
    
    async drawForTurn(){
        //it's a game jam bay beeee
        let sizeLimit = GetSceneAsGame(this.scene).handEffects.length > 0 ? 16 : 8 ;

        //clear hand effects 
        GetSceneAsGame(this.scene).handEffects = []

        let sizeLeft = 3;
        while(sizeLimit > 0){
            const selectedSize = getRandomInt(sizeLeft);
            const toSelectFrom = PoolStateService.ORDERED_PLAYABLE_KAIJUS[selectedSize]()
            const selectedIndex = getRandomInt(toSelectFrom.length)

            const invoked = toSelectFrom[selectedIndex].invoke(this.scene);
            // const invoked = new KaijuSeaSerpent(this.scene);
            this.getSizer().add(invoked);
            this.getSizer().layout();
            this.layout();
            await sleep(100);
            sizeLimit -= invoked.size;
            
            sizeLeft = sizeLimit < 3 ? sizeLimit : 3
        }

    }
}

const createScroller = (scene : Phaser.Scene) => 
{
    const rect = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOUR_BLACK)
    rect.setDepth(10);
    rect.setOrigin(0, 0.5);

    return rect;
}

const createPanel = (scene : Phaser.Scene, startingHand : Kaiju[]) =>  {
    const sizer = scene.rexUI.add.sizer({
        orientation: 'x',
        x: 0,
        y: 0,
        space: { item: 10 }
    })
    for (const card of startingHand) {
        sizer.add(card, {expand: true});
    }
    return sizer;
}
