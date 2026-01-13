import { ImagePath } from "../engine/assetmanager.js";
import { GameEngine } from "../engine/gameengine.js";
import { Entity } from "../engine/types.js";

/**
 * @author PG
 * @description The main player class.
 */
export class Player implements Entity {
    sprite: ImagePath = new ImagePath("res/img/player.png");
    X: number = 0;
    Y: number = 0;
    removeFromWorld: boolean = false;

    draw(ctx: CanvasRenderingContext2D, game: GameEngine): void {
        ctx.drawImage(game.getSprite(this.sprite), this.X, this.Y);
    }

    update(keys: { [key: string]: boolean }): void {
        if (keys["a"]) {
            this.X -= 1
        }
        if (keys["d"]) {
            this.X += 1
        }
    }
}
