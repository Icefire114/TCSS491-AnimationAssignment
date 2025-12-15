import { AssetManager } from "../engine/assetmanager.js";
import { GameEngine } from "../engine/gameengine.js";

const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
    const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

    gameEngine.init(ctx);
    gameEngine.start();
})