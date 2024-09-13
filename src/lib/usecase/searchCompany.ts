import { SearchResult } from "@lib/presenter/useSearch";

export type SearchCompanyOption = {
  companyId: string;
};

type Result<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export async function searchCompany({
  companyId,
}: SearchCompanyOption): Promise<Result<SearchResult>> {
  // ここでAPI呼び出し, 以降のレイヤーは省略
  return {
    data: {
      id: companyId,
      name: "株式会社テスト",
      address: "東京都新宿区",
      url: "https://example.com",
      telephone: "00-1234-5678",
      email: "example@example.com",
    },
    error: null,
  };
}
