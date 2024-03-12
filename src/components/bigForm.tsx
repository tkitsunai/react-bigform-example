import {
  RegisterFormItems,
  useRegistration,
} from "@/presenter/useRegistration";
import { SearchResult, useSearch } from "@/presenter/useSearch";
import { useEffect } from "react";

type InputType = "text" | "number" | "email" | "tel" | "password";
type RegisterFormItemKey = keyof RegisterFormItems;
type InputItem = {
  fieldName: RegisterFormItemKey;
  label: string;
  type: InputType;
};

export const inputFormItems: { inputs: InputItem[] } = {
  inputs: [
    {
      fieldName: "name",
      label: "企業名",
      type: "text",
    },
    {
      fieldName: "address",
      label: "住所",
      type: "text",
    },
    {
      fieldName: "url",
      label: "企業URL",
      type: "text",
    },
  ],
};

interface RegistrationFormProps {
  formData: RegisterFormItems;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  handleSubmit,
  handleChange,
  formData,
}) => {
  useEffect(() => {
    console.log("render RegistrationForm");
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      {inputFormItems.inputs.map((input, key) => {
        return (
          <div key={key}>
            <label>{input.label}</label>
            <input
              type={input.type}
              name={input.fieldName}
              value={formData[input.fieldName]}
              onChange={handleChange}
            />
          </div>
        );
      })}
      <button type="submit">登録</button>
    </form>
  );
};

interface SearchFormProps {
  companyId: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

function SearchForm({
  companyId,
  handleChange,
  handleFormSubmit,
  error,
}: SearchFormProps) {
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="companyId"
        value={companyId}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
      {error && <p color="red">{error}</p>}
    </form>
  );
}

export function BigForm() {
  const initialFormData: RegisterFormItems = {
    name: "",
    address: "",
    url: "",
  };
  const {
    formData: registrationFormData,
    handleChange,
    updateFormData,
    handleSubmit,
  } = useRegistration(initialFormData);
  const {
    companyId,
    handleChange: handleSearchChange,
    handleSearch,
    error: searchError,
  } = useSearch();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(companyId, (result: SearchResult) => {
      updateFormData({
        name: result.name,
        address: result.address,
        url: result.url,
      });
    });
  };

  return (
    <>
      <div>
        <SearchForm
          companyId={companyId}
          handleChange={handleSearchChange}
          handleFormSubmit={handleFormSubmit}
          error={searchError}
        />
        <RegistrationForm
          formData={registrationFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
