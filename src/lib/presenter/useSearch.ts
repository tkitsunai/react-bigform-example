import { searchCompany } from "@/usecase/searchCompany";
import { useState } from "react";

export type CompanyId = string;

export type SearchResult = {
  id: CompanyId;
  name: string;
  address: string;
  url: string;
};

// custom hook for search
export const useSearch = () => {
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyId(e.target.value);
  };

  const onSearchHandler = (_: React.MouseEvent<HTMLButtonElement>) => {
    // 必要ならここにボタンがクリックされた時の処理を書く
    console.log("on search handler");
  };

  const formSubmitHandler = async (
    companyId: CompanyId,
    callback: (result: SearchResult) => void
  ) => {
    try {
      // usecase layer calls
      const result = await searchCompany({ companyId });
      // error handle
      if (result.error) {
        throw new Error(result.error.message);
      }

      callback(result.data);
      setError("");
    } catch (err) {
      setError("検索に失敗");
    }
  };

  return {
    companyId,
    setCompanyId,
    handleChange,
    formSubmitHandler,
    onSearchHandler,
    error,
  };
};
