export interface Collidable {
    X: number;
    Y: number;
    physicsCollider: Collider | null;
}

export interface Collider {
    collides(thisEntity: Collidable, otherEntity: Collidable): boolean;
};
