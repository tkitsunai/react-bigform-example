import {
  RegisterFormItems,
  useRegistration,
} from "@/presenter/useRegistration";
import { SearchResult, useSearch } from "@/presenter/useSearch";
import {
  InputItemProps,
  RegistrationForm,
} from "src/components/registrationForm";
import { SearchForm } from "src/components/searchForm";

const items: { inputs: InputItemProps[] } = {
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

// Container Components
export function BigFormContainer() {
  const initialFormData: RegisterFormItems = {
    name: "",
    address: "",
    url: "",
  };

  const {
    formData: registrationFormData,
    onChangeHandler: registrationChangeHandler,
    updateFormData,
    formSubmitHandler: registrationSubmitHandler,
  } = useRegistration(initialFormData);

  const {
    companyId,
    handleChange: handleSearchChange,
    formSubmitHandler: searchSubmitHandler,
    error: searchError,
    onSearchHandler,
  } = useSearch();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchSubmitHandler(companyId, (result: SearchResult) => {
      updateFormData({
        name: result.name,
        address: result.address,
        url: result.url,
      });
    });
  };

  return (
    <div>
      <SearchForm handleFormSubmit={handleFormSubmit} error={searchError}>
        <input
          name="companyId"
          type="text"
          value={companyId}
          onChange={handleSearchChange}
        />
        <SearchForm.Button onClickHandler={onSearchHandler} />
      </SearchForm>
      <RegistrationForm formSubmitHandler={registrationSubmitHandler}>
        {items.inputs.map((input: InputItemProps, key: number) => {
          return (
            <RegistrationForm.Item
              key={key}
              fieldName={input.fieldName}
              label={input.label}
              type={input.type}
              value={registrationFormData[input.fieldName]}
              onChangeHandler={registrationChangeHandler}
            />
          );
        })}
        <RegistrationForm.Button label="登録" />
      </RegistrationForm>
    </div>
  );
}
