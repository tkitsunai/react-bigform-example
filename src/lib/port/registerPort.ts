import { RegisterCompany } from "@lib/domain/register";

export interface RegisterPort {
  registrationCompany: ({
    companyId,
    overview,
  }: RegisterCompany) => Promise<void>;
}
