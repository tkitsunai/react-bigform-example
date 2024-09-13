export type CompanyId = string;
export type Name = string;
export type Address = string;
export type Url = string;
export type Telephone = string;
export type Email = string;

export type RegisterCompany = {
  companyId: CompanyId;
  overview: Overview;
};

export type Overview = {
  name: Name;
  address: Address;
  url: Url;
  telephone: Telephone;
  email: Email;
};

export function RegisterCompany(v: RegisterCompany): RegisterCompany {
  return {
    companyId: v.companyId,
    overview: {
      name: v.overview.name,
      address: v.overview.address,
      url: v.overview.url,
      telephone: v.overview.telephone,
      email: v.overview.email,
    },
  };
}
