import { GameEngine } from "./gameengine.js";

/**
 * This is the parent type for all entities, and they should all extend this type.
 */
export type Entity = {
    X: number;
    Y: number;

    removeFromWorld: boolean;
    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void;
    update(): void;
};

export type DrawLayer = number & { __brand: "DrawLayer" };
export namespace DrawLayer {
    export const MIN = -1000000 as DrawLayer;
    export const DEFAULT = 0 as DrawLayer;
    export const MAX = 1000000 as DrawLayer;

    /**
     * @param value The integer value to create a draw layer of.
     * @returns The value as a DrawLayer if it is between the allowable min and max.
     * @throws `RangeError` If `value` is outside the allowable min and max.
     */
    export function of(value: number): DrawLayer {
        if (!Number.isInteger(value) || value <= MIN || value >= MAX) {
            throw new RangeError(`DrawLayer must be an integer between ${MIN} and ${MAX}!`);
        }
        return value as DrawLayer;
    }
}
