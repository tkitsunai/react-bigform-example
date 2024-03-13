import { RegisterFormItems } from "@/presenter/useRegistration";
import { FC, FormEvent } from "react";

export type InputType = "text" | "number" | "email" | "tel" | "password";
export type RegisterFormItemKey = keyof RegisterFormItems;

export type InputItemProps = {
  fieldName: RegisterFormItemKey;
  label: string;
  type: InputType;
};

interface RegistrationFormProps {
  formSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
}

type RegistrationButtonProps = { label: string };
const RegistrationButton: FC<RegistrationButtonProps> = ({ label }) => {
  return <button type="submit">{label}</button>;
};

type RegistrationFormChild =
  | React.ReactElement<RegistrationButtonProps>
  | React.ReactNode;

interface RegistrationFormChildProps {
  children: RegistrationFormChild | RegistrationFormChild[];
}

interface InputItemExtendsProps {
  value: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormItem({
  fieldName,
  label,
  type,
  value,
  onChangeHandler,
}: InputItemProps & InputItemExtendsProps) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={fieldName}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export function RegistrationForm({
  formSubmitHandler,
  children,
}: RegistrationFormProps & RegistrationFormChildProps) {
  return <form onSubmit={formSubmitHandler}>{children}</form>;
}
RegistrationForm.Button = RegistrationButton;
RegistrationForm.Item = FormItem;
