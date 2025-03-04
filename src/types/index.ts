export type TFieldType = "text" | "textarea" | "date" | "select" | "checkbox";

export type TField = {
  type: TFieldType;
  label: string;
  required: boolean;
};

export type TPosition = "개발자" | "PO" | "디자이너";
export type TRecord = {
  name: string;
  address: string;
  memo: string;
  joinedAt: string;
  position: TPosition;
  consentToEmail: boolean;
};
