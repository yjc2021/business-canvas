import { TPosition, TRecord } from "../types";

export const FilterOptionsController = (records: TRecord[]) => {
  const nameOptions = new Set<string>();
  const addressOptions = new Set<string>();
  const memoOptions = new Set<string>();
  const joinedAtOptions = new Set<string>();
  const positionOptions = new Set<TPosition>();
  const consentToEmailOptions = new Set<boolean>([true, false]);

  records.forEach(({ name, address, memo, joinedAt, position }) => {
    nameOptions.add(name);
    addressOptions.add(address);
    memoOptions.add(memo);
    joinedAtOptions.add(joinedAt);
    positionOptions.add(position);
  });

  const get = () => ({
    name: nameOptions,
    address: addressOptions,
    memo: memoOptions,
    joinedAt: joinedAtOptions,
    position: positionOptions,
    consentToEmail: consentToEmailOptions,
  });

  return { get };
};
