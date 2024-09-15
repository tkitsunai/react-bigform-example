import {
  FinanceInfo,
  OverviewInfo,
  RegisterFormItemKeys,
  RegisterFormItemNestKeys,
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
import { FormEvent } from "react";
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
        {OverviewForm(formData.overview, onChangeItemHandler, errors)}
        {FinanceForm(formData.finance, onChangeItemHandler, errors)}
        <RegistrationForm.Button label="登録" />
      </MemoRegistrationForm>
    </>
  );
}

function getNestedFormData<T>(formData: T, fieldNamePath: string): string {
  return fieldNamePath.split(".").reduce((acc: any, part: string) => {
    if (typeof acc === "object" && acc !== null && part in acc) {
      return acc[part as keyof typeof acc];
    }
    return undefined;
  }, formData);
}

const OverviewForm = (
  overviewData: OverviewInfo,
  onChangeItemHandler: (
    category: RegisterFormItemKeys,
    fieldName: RegisterFormItemNestKeys
  ) => any,
  errors: Partial<Record<RegisterFormItemNestKeys, string>>
) => {
  return (
    <section>
      <div>
        <h2>基本</h2>
      </div>

      {overviewItems.map((item) => {
        const value = getNestedFormData(overviewData, item.fieldName);
        return (
          <RegistrationForm.Item
            key={`registration-item-${item.fieldName}`}
            fieldName={item.fieldName}
            label={item.label}
            type={item.type}
            value={value}
            onChange={onChangeItemHandler("overview", item.fieldName)}
            error={errors[item.fieldName]}
          />
        );
      })}
    </section>
  );
};

const FinanceForm = (
  formData: FinanceInfo,
  onChangeItemHandler: (
    category: RegisterFormItemKeys,
    fieldName: RegisterFormItemNestKeys
  ) => any,
  errors: Partial<Record<RegisterFormItemNestKeys, string>>
) => {
  return (
    <section>
      <div>
        <h2>財務</h2>
      </div>

      {financeItems.map((item) => {
        const value = getNestedFormData(formData, item.fieldName);
        return (
          <RegistrationForm.Item
            key={`registration-item-${item.fieldName}`}
            fieldName={item.fieldName}
            label={item.label}
            type={item.type}
            value={value}
            onChange={onChangeItemHandler("finance", item.fieldName)}
            error={errors[item.fieldName]}
          />
        );
      })}
    </section>
  );
};
