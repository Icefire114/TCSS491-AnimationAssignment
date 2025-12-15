export class AssetManager {
    private successCount: number;
    private errorCount: number;
    private cache: Record<string, HTMLImageElement>;
    private downloadQueue: string[];

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = {};
        this.downloadQueue = [];
    };

    queueDownload(path: string) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    /**
     * Downloads all stored assets
     * @param callback Called when all assets are downloaded
     */
    downloadAll(callback: Function) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const img: HTMLImageElement = new Image();

            const path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", () => {
                console.log("Loaded " + img.src);
                this.successCount++;
                if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.log("Error loading " + img.src);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    };

    getAsset(path: string): HTMLImageElement {
        return this.cache[path];
    };
};

