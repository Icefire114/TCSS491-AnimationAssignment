import { ResourcePath } from "./types";

export class AssetManager {
    private successCount: number;
    private errorCount: number;
    private cache: Record<ResourcePath, HTMLImageElement>;
    private downloadQueue: string[];

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = {};
        this.downloadQueue = [];
    };

    queueDownload(path: string) {
        console.log("Queueing: " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    /**
     * Downloads all stored assets
     * @param callback Called when all assets are downloaded
     */
    downloadAll(callback: (errorCount: number, successCount: number) => void) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10, this.errorCount, this.successCount);

        for (const path in this.downloadQueue) {
            const img: HTMLImageElement = new Image();

            console.log(path);

            img.addEventListener("load", () => {
                console.log("Loaded: " + img.src);
                this.successCount++;
                if (this.isDone()) callback(this.errorCount, this.successCount);
            });

            img.addEventListener("error", () => {
                console.error("Error loading: " + img.src);
                this.errorCount++;
                if (this.isDone()) callback(this.errorCount, this.successCount);
            });

            img.src = path;
            this.cache[ResourcePath.of(path)] = img;
        }
    };

    getImage(path: ImagePath): HTMLImageElement {
        return this.cache[path.asRaw()];
    };
};

/**
 * Represents a path to an image, eg. for using as a sprite.
 */
export class ImagePath {
    private path: ResourcePath;

    constructor(path: string) {
        if (!path.endsWith(".png") || !path.endsWith(".jpg") || !path.endsWith(".jpeg")) {
            throw new Error("Image path must be a path to an actual image!");
        }
        this.path = ResourcePath.of(path);
    }

    /**
     * @returns The raw `ResourcePath` of this current `ImagePath`.
     */
    asRaw(): ResourcePath {
        return this.path;
    }
}