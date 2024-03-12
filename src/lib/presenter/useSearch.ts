import { searchCompany } from "@/usecase/searchCompany";
import { useState } from "react";

export type CompanyId = string;

export type SearchResult = {
  id: CompanyId;
  name: string;
  address: string;
  url: string;
};

export const useSearch = () => {
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyId(e.target.value);
  };

  const handleSearch = async (
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

  return { companyId, setCompanyId, handleChange, handleSearch, error };
};
