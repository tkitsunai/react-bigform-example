export const API = {
  register,
};

type RegisterCompanyJson = {
  id: string;
  name: string;
  address: string;
  url: string;
  telephone: string;
  email: string;
};

async function register(json: RegisterCompanyJson): Promise<void> {
  const response = await fetch("https://example.com/api/v1/register", {
    body: JSON.stringify(json),
  });
  if (!response.ok) {
    throw new Error("Failed to register");
  } else {
    return;
  }
}
