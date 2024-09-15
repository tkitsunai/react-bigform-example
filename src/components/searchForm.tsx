import React, { ButtonHTMLAttributes, FormHTMLAttributes } from "react";
import { FC } from "react";

const SearchButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
}) => {
  return (
    <button type="submit" onClick={onClick}>
      Search
    </button>
  );
};

type SearchFormChild = React.ReactElement | React.ReactNode;

interface SearchFormChildProps {
  children: SearchFormChild | SearchFormChild[];
}

interface SearchFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
}

export function SearchForm({
  onSubmit,
  error,
  children,
}: SearchFormProps &
  SearchFormChildProps &
  FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
SearchForm.Button = React.memo(SearchButton);
export const MemoSearchForm = React.memo(SearchForm);
