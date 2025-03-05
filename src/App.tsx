import React, { useState } from "react";
import RecordTable from "./components/RecordTable";
import { useSearchQueries } from "./hooks/useSearchQueries";
import { TRecord } from "./types";
import { storage } from "./utils/storage";
import { RecordController } from "./utils/recordController";
import { FilterOptionsController } from "./utils/filterOptionsController";
import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import RecordForm from "./components/RecordForm";
import { createId } from "./utils/createId";

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
      id: 0,
      name: "John Doe",
      address: "서울 강남구",
      memo: "외국인",
      joinedAt: "2024-10-02",
      position: "개발자",
      consentToEmail: true,
    },
    {
      id: 1,
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
  const [records, setRecords] = React.useState<TRecord[]>(
    createDefaultRecords(storage.getItem("records")),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = controller.getParams();
  const filterOptions = FilterOptionsController(records).get();
  const handleAddRecord = ({
    name,
    address,
    memo,
    position,
    joinedAt,
    consentToEmail,
  }: Omit<TRecord, "id">) => {
    const updatedRecords = [
      ...records,
      { id: createId(), name, address, memo, joinedAt, position, consentToEmail },
    ];
    storage.setItem("records", updatedRecords);
    setRecords(updatedRecords);

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <Dialog open={isModalOpen}>
        <DialogTrigger asChild onClick={() => setIsModalOpen(true)}>
          <Button className="self-end">
            <Plus size={16} />
            추가
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>회원 추가</DialogTitle>
          </DialogHeader>
          <RecordForm onSubmit={handleAddRecord} onCancel={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <RecordTable
        records={RecordController(records).filter(controller.getParams()).get()}
        filterOptions={filterOptions}
        currentFilter={params}
        updateFilter={update}
      />
    </div>
  );
}

export default App;
