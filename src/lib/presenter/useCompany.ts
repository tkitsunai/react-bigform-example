import { SetStateAction, useCallback, useState } from "react";

const initialState = {
  companyName: "",
  address: "",
};

// ただの関数なので宣言的に書く
export function useCompanyItems() {
  const [companyId, setCompanyId] = useState(initialState.companyName);
  const [companyName, setCompanyName] = useState(initialState.companyName);
  const [companyNameError, setCompanyNameError] = useState(null);
  const [address, setAddress] = useState(initialState.address);

  const handlerCompanyId = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setCompanyId(e.target.value);
    },
    []
  );

  const handlerCompanyName = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setCompanyName(e.target.value);
    },
    []
  );

  const handlerAddress = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setAddress(e.target.value);
    },
    []
  );

  return {
    companyId,
    setCompanyId,
    handlerCompanyId,
    companyName,
    setCompanyName,
    companyNameError,
    setCompanyNameError,
    address,
    setAddress,
    handlerCompanyName,
    handlerAddress,
  };
}
