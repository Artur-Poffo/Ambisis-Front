import { z } from "zod";

export const createOrUpdateEnvironmentalLicenseFormSchema = z.object({
  licenseNumber: z.string().min(1, {
    message: "O número da licença é obrigatório.",
  }),
  environmentalAgency: z.string().min(1, {
    message: "O órgão ambiental é obrigatório.",
  }),
  companyId: z.string().min(1, {
    message: "O ID da empresa é obrigatório.",
  }),
  issuedAt: z.string().min(1, {
    message: "A data de emissão é obrigatória.",
  }),
  validUntil: z.string().min(1, {
    message: "A data de validade é obrigatória.",
  }),
});
export type CreateOrUpdateEnvironmentalLicenseFormValue = z.infer<
  typeof createOrUpdateEnvironmentalLicenseFormSchema
>;
