import React from "react";
import RecordTable from "./components/RecordTable";
import { useSearchQueries } from "./hooks/useSearchQueries";
import { TRecord } from "./types";
import { storage } from "./utils/storage";
import { RecordController } from "./utils/recordController";
import { FilterOptionsController } from "./utils/filterOptionsController";

function validateRecords(data: unknown): boolean {
  try {
    if (!data) return false;

    if (!Array.isArray(data)) return false;

    return data.every(
      (record: unknown) =>
        typeof (record as TRecord).id === "number" &&
        typeof (record as TRecord).name === "string" &&
        typeof (record as TRecord).address === "string" &&
        typeof (record as TRecord).memo === "string" &&
        typeof (record as TRecord).joinedAt === "string" &&
        typeof (record as TRecord).position === "string" &&
        typeof (record as TRecord).consentToEmail === "boolean",
    );
  } catch (error) {
    console.error("Error validating records:", error);
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createDefaultRecords = (storageResult: any) => {
  if (validateRecords(storageResult)) return storageResult;

  const defaultRecords: TRecord[] = [
    {
      id: 1,
      name: "John Doe",
      address: "서울 강남구",
      memo: "외국인",
      joinedAt: "2024-10-02",
      position: "개발자",
      consentToEmail: true,
    },
    {
      id: 2,
      name: "Foo Bar",
      address: "서울 서초구",
      memo: "한국인",
      joinedAt: "2024-10-01",
      position: "PO",
      consentToEmail: false,
    },
  ];
  storage.setItem("records", defaultRecords);
  return defaultRecords;
};
function App() {
  const { controller, update } = useSearchQueries();
  const [records] = React.useState<TRecord[]>(createDefaultRecords(storage.getItem("records")));
  const params = controller.getParams();
  const filterOptions = FilterOptionsController(records).get();
  return (
    <RecordTable
      records={RecordController(records).filter(controller.getParams()).get()}
      filterOptions={filterOptions}
      currentFilter={params}
      updateFilter={update}
    />
  );
}

export default App;
