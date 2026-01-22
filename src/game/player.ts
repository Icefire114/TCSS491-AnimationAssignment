import { ImagePath } from "../engine/assetmanager.js";
import { GameEngine } from "../engine/gameengine.js";
import { Entity } from "../engine/Entity.js";
import { Vec2 } from "../engine/types.js";
import { AnimationState, Animator } from "../engine/Animator.js";

/**
 * @author PG
 * @description The main player class.
 */
export class Player implements Entity {
    velocity: Vec2 = new Vec2();
    position: Vec2 = new Vec2();
    sprite: ImagePath = new ImagePath("res/img/player.png");
    animator: Animator = new Animator([
        [
            {
                sprite: new ImagePath("res/img/Wild Zombie/Idle.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 9
            },
            AnimationState.IDLE
        ],
        [
            {
                sprite: new ImagePath("res/img/Wild Zombie/Walk.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 10
            },
            AnimationState.WALK_L
        ],
        [
            {
                sprite: new ImagePath("res/img/Wild Zombie/Walk.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 10
            },
            AnimationState.WALK_R
        ]

    ]);
    removeFromWorld: boolean = false;
    tag: string = "player";

    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void {
        this.animator.drawCurrentAnimFrameAtPos(ctx, this.position);
    }

    update(keys: { [key: string]: boolean }, deltaTime: number): void {
        if (!keys["a"] && !keys["s"] && !keys["w"] && !keys["d"]) {
            this.animator.updateAnimState(AnimationState.IDLE);
        }

        if (keys["a"]) {
            this.animator.updateAnimState(AnimationState.WALK_L)
        } else if (keys["d"]) {
            this.animator.updateAnimState(AnimationState.WALK_R)
        } else if (keys["w"]) {
            this.animator.updateAnimState(AnimationState.JUMP)
        }

    }
}
