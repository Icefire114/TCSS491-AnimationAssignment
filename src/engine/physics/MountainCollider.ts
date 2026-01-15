import { BoxCollider } from "./BoxCollider.js";
import { Collider, Collidable } from "./Collider.js";

export class MountainCollider implements Collider {
    /*
        has a list of points (same as the mountain's render points) which 
        it uses to make a list of lines which will be line colliders that entities can collide with
    */
    private points: number[];
    constructor(points: number[]) {
        this.points = points;
    }


    /**
     * Checks if this collider collides with the other collider.
     * @param other The other collider to check for collision with
     * @returns `true` if this collider collides with the other colider, `false` otherwide
     */
    collides(thisEntity: Collidable, otherEntity: Collidable): boolean {
        if (otherEntity.physicsCollider instanceof BoxCollider && this.points) {
            const box = otherEntity.physicsCollider;
            const boxEntity = otherEntity;

            const boxLeft = boxEntity.X;
            const boxRight = boxEntity.X + box.width;
            const boxBottom = boxEntity.Y;

            // The mountain's position is an offset.
            const mountainX = thisEntity.X;
            const mountainY = thisEntity.Y;

            // A very simple check: get height of terrain at several points under the box.
            const checkPoints = [boxLeft, (boxLeft + boxRight) / 2, boxRight];
            for (const x of checkPoints) {
                const terrainX = x - mountainX;
                if (terrainX >= 0 && terrainX < this.points.length) {
                    const x1 = Math.floor(terrainX);
                    const x2 = Math.ceil(terrainX);
                    if (x1 >=0 && x2 < this.points.length) {
                        const y1 = this.points[x1] + mountainY;
                        const y2 = this.points[x2] + mountainY;
                        
                        let terrainHeight = y1;
                        if (x1 !== x2) {
                            terrainHeight = y1 + (y2 - y1) * (terrainX - x1) / (x2 - x1);
                        }

                        if (boxBottom > terrainHeight) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
};