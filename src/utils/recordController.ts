import { TRecord } from "../types";

type TRecordWithoutId = Omit<TRecord, "id">;
export const RecordController = (records: TRecord[]) => ({
  add: (record: TRecord) => {
    return RecordController([...records, record]);
  },
  remove: (id: number) => {
    return RecordController(records.filter((record) => record.id !== id));
  },
  update: (id: number, record: TRecordWithoutId) => {
    return RecordController(records.map((r) => (r.id === id ? { ...record, id } : r)));
  },
  filter: (filter: Partial<TRecordWithoutId>) => {
    const filterEntries = Object.entries(filter);

    return records.filter((record) => {
      return filterEntries.every(([key, value]) => record[key as keyof TRecordWithoutId] === value);
    });
  },
  get: () => records,
});
