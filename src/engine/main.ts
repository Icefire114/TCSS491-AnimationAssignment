import { GameEngine } from "./gameengine.js";
import { AssetManager } from "./assetmanager.js";

const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
    const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

    gameEngine.init(ctx);
    gameEngine.start();
});
