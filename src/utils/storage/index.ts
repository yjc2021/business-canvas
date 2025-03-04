import { TRecord } from "../../types";
import { ls } from "./localStorage";

type TStorage =
  | {
      key: "local-storage";
      storage: null;
    }
  | {
      key: "in-memory";
      storage: Map<string, unknown>;
    };

export class StorageController {
  public storageMap: TStorage;
  constructor() {
    if (import.meta.env.VITE_STORAGE === "local-storage") {
      this.storageMap = {
        key: "local-storage",
        storage: null,
      };
    } else {
      this.storageMap = {
        key: "in-memory",
        storage: new Map(),
      };
    }
  }

  setItem(key: string, value: TRecord) {
    if (this.storageMap.key === "local-storage") {
      ls.setItem(key, value);
    } else {
      this.storageMap.storage.set(key, value);
    }
  }

  getItem(key: string) {
    if (this.storageMap.key === "local-storage") {
      return ls.getItem(key);
    } else {
      return this.storageMap.storage.get(key);
    }
  }

  removeItem(key: string) {
    if (this.storageMap.key === "local-storage") {
      ls.removeItem(key);
    } else {
      this.storageMap.storage.delete(key);
    }
  }
}

export const storage = new StorageController();
