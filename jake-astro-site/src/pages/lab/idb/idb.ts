export class Img {
    id?: number;
    updated: number;
    name: string;
    blob: Blob;

    constructor(name: string, blob?: Blob) {
        this.name = name;
        this.blob = blob ?? new Blob();
        this.updated = Date.now();
        this.id = 0;
    }
}

export class ImgDB {
    db?: IDBDatabase;
    #ver: number = 1;
    #key: string = "imgDB";

    constructor() { }

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const req = window.indexedDB.open(this.#key, this.#ver);
            // Register two event handlers to act on the database being opened successfully, or not
            req.onerror = (err) => {
                console.error("db open err:", err);
                reject("error opening database");
            };

            req.onsuccess = (event) => {
                console.log("db conn open");
                const _db = (event.target as IDBOpenDBRequest).result;
                _db.onerror = (err) => {
                    console.error("db err:", err);
                    reject("database error");
                };
                this.db = _db;
                resolve();
            };

            req.onupgradeneeded = (event) => {
                const _db = (event.target as IDBOpenDBRequest).result;
                _db.onerror = (err) => {
                    console.error("db upgrade err:", err);
                    reject("database migration error");
                };

                const store = _db.createObjectStore(this.#key, {
                    // The 'id' property of the object will be the key.
                    keyPath: "id",
                    // If it isn't explicitly set, create a value by auto incrementing.
                    autoIncrement: true,
                });

                store.createIndex("updated", "updated");
                store.createIndex("name", "name");
                this.db = _db;
                resolve();
            };
        })
    }

    async put(img: Img): Promise<void> {
        if (img.id === 0) delete img.id;
        return new Promise((resolve, reject) => {
            if (!this.db) { reject("db not initialized"); return; }
            const trans = this.db.transaction(this.#key, "readwrite");
            const store = trans.objectStore(this.#key);
            const req = store.put(img);
            req.onerror = () => {
                const err = `save error: ${req.error}`;
                console.error(err);
                reject(err);
            };
            req.onsuccess = () => {
                console.log(req.result);
                resolve();
            };
        });
    }

    async get(key: number): Promise<Img> {
        return new Promise((resolve, reject) => {
            if (!this.db) { reject("db not initialized"); return; }
            const trans = this.db.transaction(this.#key, "readonly");
            const store = trans.objectStore(this.#key);
            const req = store.get(key);
            req.onerror = () => {
                const err = `load error: ${req.error}`;
                console.error(err);
                reject(err);
            };
            req.onsuccess = () => {
                console.log("loaded:", req.result);
                resolve(req.result);
            };
        });
    }

    async del(key: number): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) { reject("db not initialized"); return; }
            const trans = this.db.transaction(this.#key, "readwrite");
            const store = trans.objectStore(this.#key);
            const req = store.delete(key);
            req.onerror = () => {
                const err = `drop error: ${req.error}`;
                console.error(err);
                reject(err);
            };
            req.onsuccess = () => {
                resolve();
            };
        });
    }

    async list(): Promise<Array<number>> {
        return new Promise((resolve, reject) => {
            if (!this.db) { reject("db not initialized"); return; }
            const trans = this.db.transaction(this.#key, "readonly");
            const store = trans.objectStore(this.#key);
            const req = store.getAllKeys();
            req.onerror = () => {
                const err = `load error: ${req.error}`;
                console.error(err);
                reject(err);
            };
            req.onsuccess = () => {
                if (!req.result || req.result.length === 0) { resolve([]); return; }
                resolve(req.result.map((k) => k.valueOf() as number));
            };
        });
    }

}

