import { TRecord } from "../types";

type TRecordWithoutId = Omit<TRecord, "id">;
type TRecordMap = {
  [K in keyof TRecordWithoutId]: TRecordWithoutId[K][];
};
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
  filter: (filter: Partial<TRecordMap>) => {
    const filterFields = Object.entries(filter);
    return RecordController(
      records.filter((record) => {
        return filterFields.every(([field, values]) =>
          values.some((value) => record[field as keyof TRecordWithoutId] === value),
        );
      }),
    );
  },
  get: () => records,
});
