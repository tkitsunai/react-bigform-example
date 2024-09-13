import { InputItemProps } from "@components/registrationForm";

export const overviewItems: InputItemProps[] = [
  {
    fieldName: "overview.name",
    label: "名前",
    type: "text",
  },
  {
    fieldName: "overview.address",
    label: "住所",
    type: "text",
  },
  {
    fieldName: "overview.url",
    label: "URL",
    type: "text",
  },
  {
    fieldName: "overview.telephone",
    label: "電話番号",
    type: "tel",
  },
  {
    fieldName: "overview.email",
    label: "メールアドレス",
    type: "email",
  },
];
