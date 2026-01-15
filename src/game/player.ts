import { ImagePath } from "../engine/assetmanager.js";
import { GameEngine } from "../engine/gameengine.js";
import { BoxCollider } from "../engine/physics/BoxCollider.js";
import { Entity } from "../engine/Entity.js";
import { clamp, unwrap, } from "../engine/util.js";
import { Mountain } from "./mountain.js";

/**
 * @author PG
 * @description The main player class.
 */
export class Player implements Entity {
    xV: number = 0;
    yV: number = 0;
    physicsCollider = new BoxCollider(1, 2);

    sprite: ImagePath = new ImagePath("res/img/player.png");
    X: number = 0;
    Y: number = 0;
    removeFromWorld: boolean = false;
    tag: string = "player";

    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void {
        const sprite = game.getSprite(this.sprite);

        const player_width_in_world_units = 4;

        const meter_in_pixels = ctx.canvas.width / GameEngine.WORLD_UNITS_IN_VIEWPORT;

        const w = player_width_in_world_units * meter_in_pixels;
        const h = sprite.height * (w / sprite.width);

        const scale = ctx.canvas.width / GameEngine.WORLD_UNITS_IN_VIEWPORT;
        const screenX = (this.X - game.viewportX) * scale / game.zoom;
        const screenY = (this.Y - game.viewportY) * scale / game.zoom;

        ctx.drawImage(
            sprite,
            screenX - w / 2,
            screenY - h,
            w,
            h
        );
    }

    update(keys: { [key: string]: boolean }, deltaTime: number): void {
        if (keys["a"]) {
            this.xV += clamp(-200 * deltaTime, -100, 100)
            this.yV += 10 * deltaTime
        }
        if (keys["d"]) {
            this.xV += clamp(200 * deltaTime, -100, 100)
            this.yV += 10 * deltaTime
        }

        this.yV += clamp((GameEngine.g_INSTANCE.G ** 2) * deltaTime, -100, 100)

        this.X = clamp(this.X + (this.xV * deltaTime), 0, Infinity)
        this.Y += this.yV * deltaTime

        // Colision with the terrain.
        const mountain = unwrap(GameEngine.g_INSTANCE.getEntityByTag("mountain"));
        if (mountain && mountain.physicsCollider) {
            if (this.physicsCollider.collides(this, mountain)) {
                // TODO: Make the position jump to the nearest surface, or the amount moved should be 
                // proportional to the distance we are below the terrain
                this.Y -= this.physicsCollider.height;
                this.yV = 0;
            }
        }
    }
}
