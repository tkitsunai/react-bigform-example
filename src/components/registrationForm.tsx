import {
  RegisterFormItemKeys,
  RegisterFormItemNestKeys,
} from "@lib/presenter/useRegistration";
import React, {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import { FC, FormEvent } from "react";

export type InputItemProps = {
  fieldName: RegisterFormItemNestKeys;
  label: string;
  type: HTMLInputTypeAttribute;
  error?: string;
};

interface RegistrationFormProps {
  formSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
}

const RegistrationButton: FC<{ label: string }> = ({ label }) => {
  return <button type="submit">{label}</button>;
};

interface RegistrationFormChildProps {
  children: React.ReactNode[];
}

export function FormItem({
  fieldName,
  label,
  type,
  value,
  onChange,
  error,
}: InputItemProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <input
        type={type}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export function RegistrationForm({
  formSubmitHandler,
  children,
}: RegistrationFormProps & RegistrationFormChildProps) {
  return <form onSubmit={formSubmitHandler}>{children}</form>;
}
RegistrationForm.Button = React.memo(RegistrationButton);
RegistrationForm.Item = React.memo(FormItem);
export const MemoRegistrationForm = React.memo(RegistrationForm);
