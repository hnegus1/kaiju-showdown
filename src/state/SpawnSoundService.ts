import type Kaiju from "../entities/Kaiju";
import type { Zone } from "../entities/Zone";
import { getRandomInt } from "../helpers/RandomHelper";


class SpawnSoundServiceClass{


    boop(scene : Phaser.Scene, name : string){

        const max = 20;
        const result = ( getRandomInt(max) - (max / 2) ) / 10;

        scene.sound.play(name, {
            rate: 1 + result
        });

    }
}

export let SpawnSoundService : SpawnSoundServiceClass;
// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
export const InitSpawnSoundService = () => SpawnSoundService = new SpawnSoundServiceClass();