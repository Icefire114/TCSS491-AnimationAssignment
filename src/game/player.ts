import { ImagePath } from "../engine/assetmanager.js";
import { GameEngine } from "../engine/gameengine.js";
import { Entity } from "../engine/Entity.js";
import { Vec2 } from "../engine/types.js";
import { AnimationState, Animator } from "../engine/Animator.js";


enum State {
    IDLE,
    WALKING,
    JUMPING,
    FALLING
}

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
                sprite: new ImagePath("res/img/Wild Zombie/Walk_L.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 10
            },
            AnimationState.WALK_L
        ],
        [
            {
                sprite: new ImagePath("res/img/Wild Zombie/Walk_R.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 10
            },
            AnimationState.WALK_R
        ],
        [
            {
                sprite: new ImagePath("res/img/Wild Zombie/Jump_R.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 6
            },
            AnimationState.JUMP_R
        ],
        [
            {
                sprite: new ImagePath("res/img/Wild Zombie/Jump_L.png"),
                frameHeight: 96,
                frameWidth: 96,
                frameCount: 6
            },
            AnimationState.JUMP_L
        ]
    ],
        { x: 20, y: 20 });
    removeFromWorld: boolean = false;
    tag: string = "player";

    state: State = State.IDLE;
    jumpDuration: number = 1; // Animator frames per second * jump animation frame count
    private jumpTimer: number = 0;   // seconds remaining in current jump
    private onGround: boolean = true;
    private facing: "left" | "right" = "right";

    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void {
        this.animator.drawCurrentAnimFrameAtPos(ctx, this.position);
    }


    update(keys: { [key: string]: boolean }, deltaTime: number): void {
        // Handle horizontal movement + facing
        if (keys["a"]) {
            this.facing = "left";
            this.velocity.x += -1 * 50 * deltaTime;
        } else if (keys["d"]) {
            this.facing = "right";
            this.velocity.x += 1 * 50 * deltaTime;
        }

        // Handle jump initiation
        if ((keys["w"] || keys[" "]) && this.onGround) {
            this.onGround = false;
            this.jumpTimer = this.jumpDuration;
            this.velocity.y = -9.81 * 50 * deltaTime;
        }

        // Jumping
        if (!this.onGround) {
            this.jumpTimer -= deltaTime;

            const jumpAnim =
                this.facing === "left"
                    ? AnimationState.JUMP_L
                    : AnimationState.JUMP_R;

            this.state = State.JUMPING;
            this.animator.updateAnimState(jumpAnim, deltaTime);
            this.updatePosition(deltaTime);

            if (this.jumpTimer <= 0) {
                this.onGround = true;
            }

            return;
        }

        // Walking
        if (keys["a"] || keys["d"]) {
            this.state = State.WALKING;
            this.animator.updateAnimState(
                this.facing === "left"
                    ? AnimationState.WALK_L
                    : AnimationState.WALK_R,
                deltaTime
            );
            this.updatePosition(deltaTime);
            return;
        }

        // Idle
        this.state = State.IDLE;
        this.animator.updateAnimState(AnimationState.IDLE, deltaTime);
        this.updatePosition(deltaTime);
    }

    updatePosition(deltaTime: number): void {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }
}

