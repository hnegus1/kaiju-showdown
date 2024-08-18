
import { KaijuBerzerk } from "../entities/Kaijus/KaijuBerzerk";
import { KaijuBigBarracuda } from "../entities/Kaijus/KaijuBigBarracuda";
import { KaijuDealCloser } from "../entities/Kaijus/KaijuDealCloser";
import { KaijuIslandTurtle } from "../entities/Kaijus/KaijuIslandTurtle";
import { KaijuMinnow } from "../entities/Kaijus/KaijuMinnow";
import { KaijuOyster } from "../entities/Kaijus/KaijuOyster";
import { KaijuPufferFish } from "../entities/Kaijus/KaijuPufferFish";
import { KaijuSeaBaby } from "../entities/Kaijus/KaijuSeaBaby";
import { KaijuSeaLeviathan } from "../entities/Kaijus/KaijuSeaLeviathan";
import { KaijuSeaRegular } from "../entities/Kaijus/KaijuSeaRegular";
import { KaijuSeaSerpent } from "../entities/Kaijus/KaijuSeaSerpent";
import { KaijuSeaUrchin } from "../entities/Kaijus/KaijuSeaUrchin";
import { KaijuSkyScraperSnacker } from "../entities/Kaijus/KaijuSkyScraperSnacker";
import { KaijuWallStreet } from "../entities/Kaijus/KaijuWallStreetEater";
import { KaijuKeyboardWarrior } from "../entities/Kaijus/KajuKeyboardWarrior";
import type { KaijuShell } from "../model/KaijuShell";


class PoolStateServiceClass{
    PLAYABLE_KAIJUS : KaijuShell[] = [
        // {
        //     size: 1,
        //     invoke: (scene : Phaser.Scene) => new KaijuSeaUrchin(scene) 
        // },
        {
            size: 1,
            title: "Li'l Baby Kaiju",
            invoke: (scene : Phaser.Scene) => new KaijuSeaBaby(scene) 
        },
        {
            size: 2,
            title: "Sea Kaiju",
            invoke: (scene : Phaser.Scene) => new KaijuSeaRegular(scene) 
        },
        {
            title: "Leviathan",
            size: 3,
            invoke: (scene : Phaser.Scene) => new KaijuSeaLeviathan(scene) 
        },
    ]
    
    PLAYABLE_KAIJUS_SIZE_1 = () => this.PLAYABLE_KAIJUS.filter(x => x.size === 1)
    PLAYABLE_KAIJUS_SIZE_2 = () => this.PLAYABLE_KAIJUS.filter(x => x.size === 2)
    PLAYABLE_KAIJUS_SIZE_3 = () => this.PLAYABLE_KAIJUS.filter(x => x.size === 3)

    ORDERED_PLAYABLE_KAIJUS = [
        this.PLAYABLE_KAIJUS_SIZE_1,
        this.PLAYABLE_KAIJUS_SIZE_2,
        this.PLAYABLE_KAIJUS_SIZE_3
    ]
    
    RECRUITABLE_KAIJUS : KaijuShell[] = [
        {
            title: "Sea Urchin",
            size: 1,
            invoke: (scene : Phaser.Scene) => new KaijuSeaUrchin(scene) 
        },
        {
            title: "Oyster",
            size: 1,
            invoke: (scene : Phaser.Scene) => new KaijuOyster(scene) 
        },
        {
            title: "Puffer Fish",
            size: 1,
            invoke: (scene : Phaser.Scene) => new KaijuPufferFish(scene) 
        },
        {
            title: "Minnow",
            size: 1,
            invoke: (scene : Phaser.Scene) => new KaijuMinnow(scene) 
        },
        {
            title: "Wall Street Eater",
            size: 2,
            invoke: (scene : Phaser.Scene) => new KaijuWallStreet(scene) 
        },
        {
            title: "Sea Serpent",
            size: 2,
            invoke: (scene : Phaser.Scene) => new KaijuSeaSerpent(scene) 
        },
        {
            title: "Big Barracuda",
            size: 2,
            invoke: (scene : Phaser.Scene) => new KaijuBigBarracuda(scene) 
        },
        {
            title: "Island Turtle",
            size: 2,
            invoke: (scene : Phaser.Scene) => new KaijuIslandTurtle(scene) 
        },
        {
            title: "The Deal Closer",
            size: 3,
            invoke: (scene : Phaser.Scene) => new KaijuDealCloser(scene) 
        },
        {
            title: "Sky Scraper Snacker",
            size: 3,
            invoke: (scene : Phaser.Scene) => new KaijuSkyScraperSnacker(scene) 
        },
        {
            title: "Berserk",
            size: 3,
            invoke: (scene : Phaser.Scene) => new KaijuBerzerk(scene) 
        },
        {
            title: "Keyboard Warrior",
            size: 3,
            invoke: (scene : Phaser.Scene) => new KaijuKeyboardWarrior(scene) 
        },
    ]
    
    RECRUITABLE_KAIJUS_SIZE_1 = () => this.RECRUITABLE_KAIJUS.filter(x => x.size === 1)
    RECRUITABLE_KAIJUS_SIZE_2 = () => this.RECRUITABLE_KAIJUS.filter(x => x.size === 2)
    RECRUITABLE_KAIJUS_SIZE_3 = () => this.RECRUITABLE_KAIJUS.filter(x => x.size === 3)

    ORDERED_RECRUITABLE_KAIJUS = [
        this.RECRUITABLE_KAIJUS_SIZE_1,
        this.RECRUITABLE_KAIJUS_SIZE_2,
        this.RECRUITABLE_KAIJUS_SIZE_3,
    ]
    
}

export let PoolStateService : PoolStateServiceClass;
// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
export const InitPoolStateService = () => PoolStateService = new PoolStateServiceClass();