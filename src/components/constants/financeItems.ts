import { InputItemProps } from "@components/registrationForm";

export const financeItems: InputItemProps[] = [
  {
    fieldName: "finance.fiscalYear",
    label: "会計年度",
    type: "text",
  },
  {
    fieldName: "finance.accountingPeriod",
    label: "決算期",
    type: "text",
  },
];
