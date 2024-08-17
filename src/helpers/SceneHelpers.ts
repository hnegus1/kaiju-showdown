import type { Game } from "../scenes/Game";


export const GetSceneAsGame = (scene : Phaser.Scene) => scene as Game

export const GetZoneContainer = (scene : Phaser.Scene) => GetSceneAsGame(scene).playerZoneContainer