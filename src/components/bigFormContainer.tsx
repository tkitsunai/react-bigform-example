import {
  RegisterFormItemKeys,
  RegisterFormItems,
  useRegistration,
} from "@lib/presenter/useRegistration";
import { SearchResult, useSearch } from "@lib/presenter/useSearch";
import { MemoSearchForm, SearchForm } from "@components/searchForm";
import { overviewItems } from "@components/constants/overviewItems";
import {
  MemoRegistrationForm,
  RegistrationForm,
} from "@components/registrationForm";
import { RegisterGateway } from "@lib/gateway/registerGateway";
import { RegisterUsecase } from "@lib/usecase/registrationCompany";
import { API } from "@lib/driver/api";
import { FormEvent, MouseEventHandler } from "react";
import { financeItems } from "@components/constants/financeItems";

// Container Components
export function BigFormContainer() {
  const [
    formData,
    onChangeItemHandler,
    updateFormData,
    registerOnSubmit,
    errors,
  ] = useRegistration();

  const [
    companyId,
    companyIdOnChangeHandler,
    onSearchHandler,
    searchError,
    setSearchError,
  ] = useSearch();

  const searchOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (companyId === "") {
      setSearchError("IDを入力してください");
      return;
    }

    onSearchHandler(companyId, (result: SearchResult) => {
      updateFormData({
        overview: {
          name: result.name,
          address: result.address,
          url: result.url,
          telephone: result.telephone,
          email: result.email,
        },
      });
    });
  };

  const registerOnSubmitHandler = (e: FormEvent) => {
    registerOnSubmit(e);
    RegisterUsecase(RegisterGateway(API)).registrationCompany({
      companyId: companyId,
      overview: formData.overview,
    });
  };

  function getNestedFormData(
    formData: any,
    fieldNamePath: RegisterFormItemKeys
  ) {
    return fieldNamePath
      .split(".")
      .reduce((acc, part) => acc && acc[part], formData);
  }

  return (
    <>
      <MemoSearchForm onSubmit={searchOnSubmit} error={searchError}>
        <input
          name="companyId"
          type="text"
          value={companyId}
          onChange={(e) => companyIdOnChangeHandler(e.target.value)}
        />
        <SearchForm.Button />
      </MemoSearchForm>
      <MemoRegistrationForm formSubmitHandler={registerOnSubmitHandler}>
        {OverviewForm(formData, onChangeItemHandler, errors, getNestedFormData)}
        {FinanceForm(formData, onChangeItemHandler, errors, getNestedFormData)}
        <RegistrationForm.Button label="登録" />
      </MemoRegistrationForm>
    </>
  );
}

const OverviewForm = (
  formData: RegisterFormItems,
  onChangeItemHandler: (fieldName: RegisterFormItemKeys) => any,
  errors: Partial<Record<RegisterFormItemKeys, string>>,
  getNestedFormData: (formData: any, fieldNamePath: RegisterFormItemKeys) => any
) => {
  return (
    <section>
      <div>
        <h2>基本</h2>
      </div>

      {overviewItems.map((item) => {
        return (
          <RegistrationForm.Item
            key={`registration-item-${item.fieldName}`}
            fieldName={item.fieldName}
            label={item.label}
            type={item.type}
            value={getNestedFormData(formData, item.fieldName)}
            onChange={onChangeItemHandler(item.fieldName)}
            error={errors[item.fieldName]}
          />
        );
      })}
    </section>
  );
};

const FinanceForm = (
  formData: RegisterFormItems,
  onChangeItemHandler: (fieldName: RegisterFormItemKeys) => any,
  errors: Partial<Record<RegisterFormItemKeys, string>>,
  getNestedFormData: (formData: any, fieldNamePath: RegisterFormItemKeys) => any
) => {
  return (
    <section>
      <div>
        <h2>財務</h2>
      </div>

      {financeItems.map((item) => {
        return (
          <RegistrationForm.Item
            key={`registration-item-${item.fieldName}`}
            fieldName={item.fieldName}
            label={item.label}
            type={item.type}
            value={getNestedFormData(formData, item.fieldName)}
            onChange={onChangeItemHandler(item.fieldName)}
            error={errors[item.fieldName]}
          />
        );
      })}
    </section>
  );
};
