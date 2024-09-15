import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export type RegisterFormItems = {
  overview: OverviewInfo;
  finance: FinanceInfo;
};

export type OverviewInfo = {
  name: string;
  address: string;
  url: string;
  telephone: string;
  email: string;
};

export type FinanceInfo = {
  fiscalYear: string;
  accountingPeriod: string;
};

export type RegisterFormItemKeys = `${keyof RegisterFormItems}`;

export type RegisterFormItemNestKeys =
  | `${keyof OverviewInfo}`
  | `${keyof FinanceInfo}`;

const initialFormData: RegisterFormItems = {
  overview: {
    name: "",
    address: "",
    url: "",
    telephone: "",
    email: "",
  },
  finance: {
    fiscalYear: "",
    accountingPeriod: "",
  },
};

// custom hook for registration
export const useRegistration = () => {
  const [formData, setFormData] = useState<RegisterFormItems>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<RegisterFormItemNestKeys, string>>
  >({});

  function validateItem(fieldName: RegisterFormItemNestKeys, value: string) {
    let error = "";
    if (fieldName === "name" && !value) {
      error = "名前を入力してください。";
    }
    return error;
  }

  const onChangeItemHandler = useCallback(
    (category: RegisterFormItemKeys, fieldName: RegisterFormItemNestKeys) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
          ...prevData,
          [category]: {
            ...prevData[category as keyof typeof prevData],
            [fieldName]: value,
          },
        }));
      },
    [setFormData]
  );

  const updateFormData = useCallback(
    (newFormData: Partial<RegisterFormItems>) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...newFormData,
      }));
    },
    [setFormData]
  );

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    const errorMessage = validateItem("name", formData.overview.name);

    setErrors((prevErrors) => ({
      ...prevErrors,
      name: errorMessage,
    }));

    if (errorMessage) {
      return;
    }
  };

  return [
    formData,
    onChangeItemHandler,
    updateFormData,
    formSubmitHandler,
    errors,
  ] as const;
};
