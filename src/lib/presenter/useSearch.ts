import { searchCompany } from "@lib/usecase/searchCompany";
import { useCallback, useState } from "react";

export type CompanyId = string;

export type SearchResult = {
  id: CompanyId;
  name: string;
  address: string;
  url: string;
  telephone: string;
  email: string;
};

// custom hook for search
export const useSearch = () => {
  const [companyId, setCompanyId] = useState<string>("");
  const [searchError, setSearchError] = useState<string>();

  const companyIdOnChangeHandler = useCallback(
    (value: CompanyId) => {
      setCompanyId(value);
    },
    [setCompanyId]
  );

  const onSearchHandler = async (
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
      setSearchError(undefined);
    } catch (err) {
      setSearchError("検索に失敗");
    }
  };

  return [
    companyId,
    companyIdOnChangeHandler,
    onSearchHandler,
    searchError,
    setSearchError,
  ] as const;
};
