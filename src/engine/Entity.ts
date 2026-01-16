import { ImagePath } from "./assetmanager";
import { GameEngine } from "./gameengine";
import { Collider } from "./physics/Collider";
import { Vec2 } from "./types";

/**
 * This is the parent type for all entities, and they should all extend this type.
 */

export type Entity = {
    position: Vec2;
    velocity: Vec2;

    physicsCollider: Collider | null;
    sprite: ImagePath | null;
    readonly tag: string;

    removeFromWorld: boolean;
    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void;
    update(keys: { [key: string]: boolean; }, deltaTime: number): void;
};
