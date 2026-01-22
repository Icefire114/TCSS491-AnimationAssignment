import { ImagePath } from "./assetmanager.js";
import { GameEngine } from "./gameengine.js";
import { Vec2 } from "./types.js";
import { clamp, unwrap } from "./util.js";

export enum AnimationState {
    IDLE,
    WALK_L,
    WALK_R,
    JUMP,
    FALL,
    ATTACK,
    HIT,
    DEATH,
}


export type SpriteSheet = {
    sprite: ImagePath;
    frameWidth: number;
    frameHeight: number;
    frameCount: number;
};

export class Animator {
    spriteSheetPaths: [SpriteSheet, AnimationState][];
    spriteSheet: Record<AnimationState, { sprite: HTMLImageElement, frameWidth: number, frameHeight: number, frameCount: number } | null> = {
        [AnimationState.IDLE]: null,
        [AnimationState.WALK_L]: null,
        [AnimationState.WALK_R]: null,
        [AnimationState.JUMP]: null,
        [AnimationState.FALL]: null,
        [AnimationState.ATTACK]: null,
        [AnimationState.HIT]: null,
        [AnimationState.DEATH]: null
    };

    m_animStateFrameCounts: Record<AnimationState, number> = {
        [AnimationState.IDLE]: 0,
        [AnimationState.WALK_L]: 0,
        [AnimationState.WALK_R]: 0,
        [AnimationState.JUMP]: 0,
        [AnimationState.FALL]: 0,
        [AnimationState.ATTACK]: 0,
        [AnimationState.HIT]: 0,
        [AnimationState.DEATH]: 0
    };

    constructor(spriteSheets: [SpriteSheet, AnimationState][]) {
        this.spriteSheetPaths = spriteSheets;

        for (const a of spriteSheets) {
            this.spriteSheet[a[1]] = {
                sprite: unwrap(GameEngine.g_INSTANCE.getSprite(a[0].sprite)),
                frameCount: a[0].frameCount,
                frameHeight: a[0].frameHeight,
                frameWidth: a[0].frameWidth
            }
        }

    }

    updateAnimState(newState: AnimationState): void {
        const oldStates = this.m_animStateFrameCounts;
        this.m_animStateFrameCounts = {
            [AnimationState.IDLE]: 0,
            [AnimationState.WALK_L]: 0,
            [AnimationState.WALK_R]: 0,
            [AnimationState.JUMP]: 0,
            [AnimationState.FALL]: 0,
            [AnimationState.ATTACK]: 0,
            [AnimationState.HIT]: 0,
            [AnimationState.DEATH]: 0
        }

        this.m_animStateFrameCounts[newState] = oldStates[newState] + 1;
    }

    drawCurrentAnimFrameAtPos(ctx: CanvasRenderingContext2D, pos: Vec2): void {
        const animState: AnimationState = Math.max(...Object.values(this.m_animStateFrameCounts)) as AnimationState
        const currentAnim: {
            sprite: HTMLImageElement,
            frameWidth: number,
            frameHeight: number,
            frameCount: number
        } | null = this.spriteSheet[animState];

        if (currentAnim === null) {
            throw new Error("SpriteSheet for animation state " + animState + " is null!");
        }


        const frameIdx = this.m_animStateFrameCounts[animState] % currentAnim.frameCount;
        const game = GameEngine.g_INSTANCE;

        const player_width_in_world_units = 6;

        const meter_in_pixels = ctx.canvas.width / GameEngine.WORLD_UNITS_IN_VIEWPORT;

        const w = player_width_in_world_units * meter_in_pixels;
        const h = currentAnim.sprite.height * (w / currentAnim.sprite.width);

        const scale = ctx.canvas.width / GameEngine.WORLD_UNITS_IN_VIEWPORT;
        const screenX = (pos.x - game.viewportX) * scale / game.zoom;
        const screenY = (pos.y - game.viewportY) * scale / game.zoom;

        ctx.drawImage(
            currentAnim.sprite,
            frameIdx * currentAnim.frameWidth, // srcImgX
            0, // srcImgY
            currentAnim.frameWidth, // srcImgW
            currentAnim.frameHeight, // srcImgH
            screenX - w / 2,
            screenY - h,
            w,
            h
        );
    }
}
