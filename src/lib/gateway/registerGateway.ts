import { RegisterCompany } from "@lib/domain/register";
import { API } from "@lib/driver/api";

export function RegisterGateway(driver: typeof API) {
  return {
    registrationCompany: async ({ companyId, overview }: RegisterCompany) => {
      const json = {
        id: companyId,
        name: overview.name,
        address: overview.address,
        url: overview.url,
        telephone: overview.telephone,
        email: overview.email,
      };

      await driver.register(json);
    },
  };
}
