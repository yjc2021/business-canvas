import { QueryController } from "@/utils/queryController";
import { TPosition, TRecord } from "../types";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVertical, Filter } from "lucide-react";

const FIELD_TITLE_MAP = {
  name: "이름",
  address: "주소",
  memo: "메모",
  joinedAt: "가입일",
  position: "직업",
  consentToEmail: "이메일 수신 동의",
};

type TFilter = {
  name: string[];
  address: string[];
  memo: string[];
  joinedAt: string[];
  position: TPosition[];
  consentToEmail: boolean[];
};
type TRecordTableProps = {
  records: TRecord[];
  filterOptions: TFilterOptions;
  currentFilter: TFilter;
  updateFilter: (fn: (controller: QueryController) => URLSearchParams) => void;
};
function RecordTable({ records, filterOptions, currentFilter, updateFilter }: TRecordTableProps) {
  return (
    <table className="w-full">
      <RecordTableHeader
        filterOptions={filterOptions}
        currentFilter={currentFilter}
        updateFilter={updateFilter}
      />
      <RecordTableContent records={records} />
    </table>
  );
}

type TFilterOptions = {
  name: Set<string>;
  address: Set<string>;
  memo: Set<string>;
  joinedAt: Set<string>;
  position: Set<TPosition>;
  consentToEmail: Set<boolean>;
};
type TRecordTableHeaderProps = {
  filterOptions: TFilterOptions;
  currentFilter: TFilter;
  updateFilter: (fn: (controller: QueryController) => URLSearchParams) => void;
};
function RecordTableHeader({
  filterOptions,
  currentFilter,
  updateFilter,
}: TRecordTableHeaderProps) {
  return (
    <thead className="bg-black/6">
      <tr className="">
        {Object.keys(filterOptions).map((field) => (
          <RecordTableHeaderField
            fieldKey={field as keyof TFilterOptions}
            options={filterOptions[field as keyof TFilterOptions]}
            current={currentFilter[field as keyof TFilterOptions]}
            update={updateFilter}
            key={field}
          />
        ))}
        <th className=""></th>
      </tr>
    </thead>
  );
}

type TRecordTableHeaderFieldProps = {
  fieldKey: keyof TFilterOptions;
  options: TFilterOptions[keyof TFilterOptions];
  current: (string | boolean)[];
  update: (fn: (controller: QueryController) => URLSearchParams) => void;
};

function RecordTableHeaderField({
  options,
  fieldKey,
  current,
  update,
}: TRecordTableHeaderFieldProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <th className="h-[38px] cursor-pointer border border-solid px-2">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold">
              {FIELD_TITLE_MAP[fieldKey as keyof TFilterOptions]}
            </span>
            <Filter size={12} className="text-black/25" />
          </div>
        </th>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-lg shadow-md">
        {[...options].map((option) => (
          <DropdownMenuCheckboxItem
            key={String(option)}
            checked={current.includes(option)}
            onClick={() =>
              update((c) => {
                if (current.includes(option)) {
                  c.set(
                    fieldKey as keyof TFilterOptions,
                    current.filter((value) => value !== option),
                  );
                } else {
                  c.set(fieldKey as keyof TFilterOptions, [...current, option]);
                }
                return c.getResult();
              })
            }
          >
            {String(option)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TRecordTableContentProps = {
  records: TRecord[];
};
function RecordTableContent({ records }: TRecordTableContentProps) {
  return (
    <tbody className="w-full text-sm font-normal text-black/88">
      {records.map((record) => (
        <RecordTableContentItem key={record.id} record={record} />
      ))}
    </tbody>
  );
}

type TRecordTableContentItemProps = {
  record: TRecord;
};
function RecordTableContentItem({ record }: TRecordTableContentItemProps) {
  return (
    <tr className="h-[48px] w-full border border-solid border-black/6">
      {Object.entries(record)
        .slice(1)
        .map(([key, value]) => (
          <td key={key} className="px-2">
            {key === "consentToEmail" ? (
              <div className="flex items-center">
                <Checkbox checked={value as boolean} />
              </div>
            ) : (
              String(value)
            )}
          </td>
        ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <td className="">
            <div className="flex items-center justify-center">
              <EllipsisVertical size={16} className="text-black/65" />
            </div>
          </td>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-lg shadow-md">
          <DropdownMenuItem>수정</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </tr>
  );
}

export default RecordTable;
