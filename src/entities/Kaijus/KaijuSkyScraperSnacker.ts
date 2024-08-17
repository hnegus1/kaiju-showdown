import { GetSceneAsGame, GetZoneContainer } from "../../helpers/SceneHelpers";
import Kaiju from "../Kaiju";


export class KaijuSkyScraperSnacker extends Kaiju{
    constructor(scene : Phaser.Scene){
        super(scene);

        this.title = "Sky Scraper Snacker";
        this.power = 200;
        this.size = 3;
        this.sprite = "kaiju_sea_skyscraper_snacker"

        this.create();
    }

}