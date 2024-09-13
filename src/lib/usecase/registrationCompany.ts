import { RegisterCompany } from "@lib/domain/register";
import { RegisterPort } from "@lib/port/registerPort";

export function RegisterUsecase(port: RegisterPort) {
  return {
    registrationCompany: async (company: RegisterCompany): Promise<void> => {
      return port.registrationCompany(company);
    },
  };
}
