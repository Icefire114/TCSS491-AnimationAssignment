import { GameEngine } from "./gameengine.js";

export type Entity = {
    clientX: number;
    clientY: number;

    removeFromWorld: boolean;
    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void;
    update(): void;
};