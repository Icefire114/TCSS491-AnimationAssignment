import { Vec2 } from "../types.js";

export interface Collidable {
    position: Vec2;
    physicsCollider: Collider | null;
}

export interface Collider {
    collides(thisEntity: Collidable, otherEntity: Collidable): boolean;
};
