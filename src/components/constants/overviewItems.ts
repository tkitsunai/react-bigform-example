import { InputItemProps } from "@components/registrationForm";

export const overviewItems: InputItemProps[] = [
  {
    fieldName: "name",
    label: "名前",
    type: "text",
  },
  {
    fieldName: "address",
    label: "住所",
    type: "text",
  },
  {
    fieldName: "url",
    label: "URL",
    type: "text",
  },
  {
    fieldName: "telephone",
    label: "電話番号",
    type: "tel",
  },
  {
    fieldName: "email",
    label: "メールアドレス",
    type: "email",
  },
];
