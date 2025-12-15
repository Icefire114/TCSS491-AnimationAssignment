import { GameEngine } from "./gameengine.js";

export type Entity = {
    X: number;
    Y: number;

    removeFromWorld: boolean;
    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void;
    update(): void;
};