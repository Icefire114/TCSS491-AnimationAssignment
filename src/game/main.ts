import { AssetManager } from "../engine/assetmanager.js";
import { GameEngine } from "../engine/gameengine.js";
import { DrawLayer } from "../engine/types.js";
import { Player } from "./player.js";

/**
 * This is the main file for the game, and it should be considered the entry point for the game.
 */

const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();


function main() {
    gameEngine.addEntity(new Player(), DrawLayer.MAX)

    try {
        gameEngine.start();
    } catch (e) {
        console.error(`Engine has encounted an uncaught error! ${e}`);
        alert(`Engine has encounted an uncaught error! ${e}`);
    }
}

ASSET_MANAGER.downloadAll((_, errorCount: number) => {
    if (errorCount > 0) {
        console.error(`Error loading assets ${errorCount} of them failed to load!`);
        alert(`Failed to load ${errorCount} assets! The game may not function correctly!`);
    }
    const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    gameEngine.init(ctx);
    main();
})
