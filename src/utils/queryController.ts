import { TPosition, TRecord } from "../types";

export class QueryController {
  name: string[];
  address: string[];
  memo: string[];
  joinedAt: string[];
  position: string[];
  consentToEmail: boolean[];

  constructor(searchParams: URLSearchParams) {
    const { name, address, memo, joinedAt, position, consentToEmail } = this.init(searchParams);

    this.name = name;
    this.address = address;
    this.memo = memo;
    this.joinedAt = joinedAt;
    this.position = position;
    this.consentToEmail = consentToEmail;
  }

  init(searchParams: URLSearchParams) {
    const getConsentToEmail = () => {
      try {
        return searchParams.getAll("consentToEmail").map(Boolean);
      } catch {
        return [];
      }
    };

    return {
      name: searchParams.getAll("name"),
      address: searchParams.getAll("address"),
      memo: searchParams.getAll("memo"),
      joinedAt: searchParams.getAll("joinedAt"),
      position: searchParams.getAll("position"),
      consentToEmail: getConsentToEmail(),
    };
  }

  set<T extends keyof Omit<TRecord, "id">>(key: T, value: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)[key] = value;
  }

  getParams() {
    const { name, address, memo, joinedAt, position, consentToEmail } = this;

    return {
      name,
      address,
      memo,
      joinedAt,
      position: position as TPosition[],
      consentToEmail,
    };
  }

  private createSearchParamsFor(key: keyof Omit<TRecord, "id">) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any)[key].map((entry: any) => [`${key}`, String(entry)]);
  }

  getResult() {
    return new URLSearchParams([
      ...this.createSearchParamsFor("name"),
      ...this.createSearchParamsFor("address"),
      ...this.createSearchParamsFor("memo"),
      ...this.createSearchParamsFor("joinedAt"),
      ...this.createSearchParamsFor("position"),
      ...this.createSearchParamsFor("consentToEmail"),
    ]);
  }

  reset() {
    const { name, address, memo, joinedAt, position, consentToEmail } = this.init(
      new URLSearchParams(),
    );

    this.name = name;
    this.address = address;
    this.memo = memo;
    this.joinedAt = joinedAt;
    this.position = position;
    this.consentToEmail = consentToEmail;
  }
}
