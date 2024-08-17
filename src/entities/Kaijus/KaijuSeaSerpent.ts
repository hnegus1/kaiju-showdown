import { BerzerkEffect } from "../../effects/scoring_end/BerzerkEffect";
import { KaijuStatus } from "../../enums/KaijuStatus";
import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";
import type { Zone } from "../Zone";


export class KaijuSeaSerpent extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Sea Serpent";
        this.power = 50;
        this.size = 2;
        this.sprite = "kaiju_sea_sea_serpent"
        this.description = `Causes ${this.power} property damage. If possible, spawn another Sea Serpent to the right.`;

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);

        if(this.status === KaijuStatus.InHand){
            game.setTurnScore(this.power * 10);
            await this.flashScoreLabel("Hmmm... I probably shouldn't let you infinitely loop... here's 10x score instead.", 3000);
            return;
        }

        game.setTurnScore(game.turnScoreVal + this.power);
        await this.flashScoreLabel(`+${this.power}`)
        const parentZone = this.getParent() as Zone 
        
        const zones = GetZoneContainer(this.scene).childrenAsZones();
        let canPlay = true;
        for (let i = parentZone.zoneIndex + this.size; i <= parentZone.zoneIndex + this.size + this.size; i++) {
            if(i >= 4){
                canPlay = false;
                break;
            }

            const zoneToQuestion = zones[i];
            if(zoneToQuestion.kaiju){
                canPlay = false;
                break;
            }
        }

        if(canPlay && zones[parentZone.zoneIndex + this.size].canPlayKaiju(this)){
            zones[parentZone.zoneIndex + 2].playKaiju(new KaijuSeaSerpent(this.scene));
            await this.flashScoreLabel('Spawning...')
        }else{
            await this.flashScoreLabel("Can't spawn!");
        }
    }
}