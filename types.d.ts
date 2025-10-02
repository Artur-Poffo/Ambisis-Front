export interface Company {
  id: string;

  companyName: string;
  cnpj: string;

  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  complement?: string | undefined;
}

export interface EnvironmentalLicense {
  id: string;

  licenseNumber: string;
  environmentalAgency: string;
  companyId: string;

  issuedAt: string;
  validUntil: string;
}
