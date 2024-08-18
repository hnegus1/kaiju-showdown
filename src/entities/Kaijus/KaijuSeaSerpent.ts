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
        this.description = `Causes ${this.power} property damage. Multiplied by the number of Kaijus in play.`;

        this.create();
    }

    async tap(){
        const game = GetSceneAsGame(this.scene);

        const cards = this.status === KaijuStatus.InHand ? GetSceneAsGame(this.scene).hand.getKaijusInHand() : GetZoneContainer(this.scene).childrenAsZones().filter(x => x.kaiju);
        const totalPower = (this.power * cards.length)
        game.setTurnScore(game.turnScoreVal + totalPower);
        await this.flashScoreLabel(`+$${totalPower} (${this.power} x ${cards.length})`)
    }
}