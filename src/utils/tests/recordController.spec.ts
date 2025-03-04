import { describe, it, expect } from "vitest";
import { RecordController } from "../recordController";
import { TPosition } from "../../types";

describe("RecordController", () => {
  const initialRecords = [
    {
      id: 1,
      name: "John Doe",
      address: "서울 강남구",
      memo: "외국인",
      joinedAt: "2024-10-02",
      position: "개발자" as TPosition,
      consentToEmail: true,
    },
  ];

  it("should add a new record", () => {
    const controller = RecordController(initialRecords);
    const newRecord = {
      id: 2,
      name: "Foo Bar",
      address: "서울 서초구",
      memo: "한국인",
      joinedAt: "2024-10-01",
      position: "PO" as TPosition,
      consentToEmail: false,
    };
    const updatedController = controller.add(newRecord);
    expect(updatedController.get()).toHaveLength(2);
    expect(updatedController.get()).toContainEqual(newRecord);
  });

  it("should remove a record by id", () => {
    const controller = RecordController(initialRecords);
    const updatedController = controller.remove(1);
    expect(updatedController.get()).toHaveLength(0);
  });

  it("should update a record by id", () => {
    const controller = RecordController(initialRecords);
    const updatedController = controller.update(1, {
      name: "John Doe",
      address: "용인 수지구",
      memo: "외국인",
      joinedAt: "2024-10-02",
      position: "PO",
      consentToEmail: false,
    });
    expect(updatedController.get()).toHaveLength(1);
    expect(updatedController.get()[0]).toStrictEqual({
      id: 1,
      name: "John Doe",
      address: "용인 수지구",
      memo: "외국인",
      joinedAt: "2024-10-02",
      position: "PO",
      consentToEmail: false,
    });
  });

  it("should filter records based on criteria", () => {
    const controller = RecordController(initialRecords);
    const filteredController = controller.filter({ position: "개발자" });
    expect(filteredController.get()).toHaveLength(1);
    expect(filteredController.get()[0].name).toBe("John Doe");
  });

  it("should return all records", () => {
    const controller = RecordController(initialRecords);
    expect(controller.get()).toEqual(initialRecords);
  });
});
