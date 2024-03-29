import { FormEvent, useCallback, useState } from "react";

export type RegisterFormItems = {
  name: string;
  address: string;
  url: string;
};

// custom hook for registration
export const useRegistration = (
  initialFormData: Required<RegisterFormItems>
) => {
  const [formData, setFormData] = useState<RegisterFormItems>(initialFormData);

  // 個別フィールドの更新
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    []
  );

  // 検索結果による更新
  const updateFormData = useCallback(
    (newFormData: Partial<RegisterFormItems>) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...newFormData,
      }));
    },
    []
  );

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("submited");
  };

  return {
    formData,
    updateFormData,
    formSubmitHandler,
    onChangeHandler,
  };
};
