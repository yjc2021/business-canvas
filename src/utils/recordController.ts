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
  filter: (filter: TRecordMap) => {
    const filterFields = Object.entries(filter).filter(([, values]) => values.length > 0);

    return RecordController(
      records.filter((record) => {
        return filterFields.every(([field, values]) =>
          (values as (string | boolean)[]).includes(
            record[field as keyof TRecordWithoutId] as string | boolean,
          ),
        );
      }),
    );
  },
  get: () => records,
});
