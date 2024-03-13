import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
}

const SearchButton: FC<ButtonProps> = ({ onClickHandler }) => {
  return (
    <button type="submit" onClick={onClickHandler}>
      Search
    </button>
  );
};

// SearchForm内で許可するコンポーネント型
type SearchFormChild = React.ReactElement<ButtonProps> | React.ReactElement;

interface SearchFormChildProps {
  children: SearchFormChild | SearchFormChild[];
}

interface SearchFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

export function SearchForm({
  handleFormSubmit,
  error,
  children,
}: SearchFormProps & SearchFormChildProps) {
  return (
    <form onSubmit={handleFormSubmit}>
      {children}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
SearchForm.Button = SearchButton;
