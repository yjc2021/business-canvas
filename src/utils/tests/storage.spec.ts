import { describe, it, expect, vi, beforeEach } from "vitest";
import { StorageController } from "../storage";
import { ls } from "../storage/localStorage";
import { TRecord } from "../../types";

vi.mock("../storage/localStorage", () => ({
  ls: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("StorageController", () => {
  let storageInstance: StorageController;
  const sampleRecord: TRecord = {
    id: 1,
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    joinedAt: "2024-01-01",
    position: "개발자",
    consentToEmail: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    storageInstance = new StorageController();
  });

  describe("when using local storage", () => {
    beforeEach(() => {
      vi.stubEnv("VITE_STORAGE", "local-storage");
      storageInstance = new StorageController();
    });

    it("should call ls.setItem when setting an item", () => {
      storageInstance.setItem("testKey", sampleRecord);
      expect(ls.setItem).toHaveBeenCalledWith("testKey", sampleRecord);
    });

    it("should call ls.getItem when getting an item", () => {
      storageInstance.getItem("testKey");
      expect(ls.getItem).toHaveBeenCalledWith("testKey");
    });

    it("should call ls.removeItem when removing an item", () => {
      storageInstance.removeItem("testKey");
      expect(ls.removeItem).toHaveBeenCalledWith("testKey");
    });
  });

  describe("when using in-memory storage", () => {
    beforeEach(() => {
      vi.stubEnv("VITE_STORAGE", "in-memory");
      storageInstance = new StorageController();
    });

    it("should store an item in memory", () => {
      storageInstance.setItem("testKey", sampleRecord);
      expect(storageInstance.getItem("testKey")).toEqual(sampleRecord);
    });

    it("should retrieve the correct item from memory", () => {
      storageInstance.setItem("testKey", sampleRecord);
      expect(storageInstance.getItem("testKey")).toEqual(sampleRecord);
    });

    it("should remove an item from memory", () => {
      storageInstance.setItem("testKey", sampleRecord);
      storageInstance.removeItem("testKey");
      expect(storageInstance.getItem("testKey")).toBeUndefined();
    });
  });
});
