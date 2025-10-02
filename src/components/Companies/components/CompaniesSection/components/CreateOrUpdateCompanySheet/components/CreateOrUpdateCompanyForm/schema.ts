import { z } from "zod";

export const createOrUpdateCompanyFormSchema = z.object({
  companyName: z.string().min(1, {
    message: "O nome da empresa é obrigatório.",
  }),
  cnpj: z.string().min(14, {
    message: "O CNPJ deve ter pelo menos 14 caracteres.",
  }),
  zipCode: z.string().min(8, {
    message: "O CEP deve ter pelo menos 8 caracteres.",
  }),
  city: z.string().min(1, {
    message: "A cidade é obrigatória.",
  }),
  state: z.string().min(1, {
    message: "O estado é obrigatório.",
  }),
  neighborhood: z.string().min(1, {
    message: "O bairro é obrigatório.",
  }),
  street: z.string().min(1, {
    message: "A rua é obrigatória.",
  }),
  complement: z.string().optional(),
});
export type CreateOrUpdateCompanyFormValue = z.infer<
  typeof createOrUpdateCompanyFormSchema
>;
