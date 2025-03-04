import { describe, it, expect, beforeEach } from "vitest";
import { QueryController } from "../queryController";

describe("QueryController", () => {
  let searchParams;
  let queryController: QueryController;

  beforeEach(() => {
    searchParams = new URLSearchParams(
      "name=John Doe&address=강남&address=서울&address=부산&memo=외국인",
    );
    queryController = new QueryController(searchParams);
  });

  it("should initialize with multiple values for the same key", () => {
    expect(queryController.name).toEqual(["John Doe"]);
    expect(queryController.address).toEqual(["강남", "서울", "부산"]);
    expect(queryController.memo).toEqual(["외국인"]);
  });

  it("should set multiple values correctly", () => {
    queryController.set("address", ["대전", "광주"]);
    expect(queryController.address).toEqual(["대전", "광주"]);
  });

  it("should create search parameters with multiple values", () => {
    const result = queryController.getResult();
    expect(result.getAll("name")).toEqual(["John Doe"]);
    expect(result.getAll("address")).toEqual(["강남", "서울", "부산"]);
    expect(result.getAll("memo")).toEqual(["외국인"]);
  });

  it("should reset to empty values", () => {
    queryController.reset();
    expect(queryController.name).toEqual([]);
    expect(queryController.address).toEqual([]);
    expect(queryController.memo).toEqual([]);
  });
});
