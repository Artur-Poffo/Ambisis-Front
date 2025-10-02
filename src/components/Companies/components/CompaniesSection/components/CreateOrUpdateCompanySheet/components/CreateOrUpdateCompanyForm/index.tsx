import { useForm } from "react-hook-form";
import {
  createOrUpdateCompanyFormSchema,
  CreateOrUpdateCompanyFormValue,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { Company } from "../../../../../../../../../types";
import { toast } from "sonner";
import { externalApi } from "@/lib/axios";

interface CreateOrUpdateCompanyFormProps {
  selectedCompany?: Company;

  onCreate?: (company: Company) => void;
  onUpdate?: (company: Company) => void;
}

export function CreateOrUpdateCompanyForm({
  selectedCompany,
  onCreate,
  onUpdate,
}: CreateOrUpdateCompanyFormProps) {
  const form = useForm<CreateOrUpdateCompanyFormValue>({
    resolver: zodResolver(createOrUpdateCompanyFormSchema),
    defaultValues: {
      companyName: selectedCompany?.companyName || "",
      cnpj: selectedCompany?.cnpj || "",
      zipCode: selectedCompany?.zipCode || "",
      city: selectedCompany?.city || "",
      state: selectedCompany?.state || "",
      neighborhood: selectedCompany?.neighborhood || "",
      street: selectedCompany?.street || "",
      complement: selectedCompany?.complement || "",
    },
  });

  async function handleCreateCompany(data: CreateOrUpdateCompanyFormValue) {
    try {
      const createCompanyResponse = await externalApi.post<{
        companyId: string;
      }>("/companies", {
        companyName: data.companyName,
        cnpj: data.cnpj,
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        street: data.street,
        complement: data.complement ?? null,
      });

      const { companyId } = createCompanyResponse.data;

      onCreate?.({
        id: companyId,
        companyName: data.companyName,
        cnpj: data.cnpj,
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        street: data.street,
        complement: data.complement ?? undefined,
      });
    } catch {
      toast.error("Erro ao criar empresa, tente novamente mais tarde");
    }
  }

  async function handleUpdateCompany(data: CreateOrUpdateCompanyFormValue) {
    if (!selectedCompany) return;

    try {
      const createCompanyResponse = await externalApi.put(
        `/companies/${selectedCompany.id}`,
        {
          companyName: data.companyName,
          cnpj: data.cnpj,
          zipCode: data.zipCode,
          city: data.city,
          state: data.state,
          neighborhood: data.neighborhood,
          street: data.street,
          complement: data.complement ?? null,
        }
      );

      onUpdate?.({
        id: selectedCompany.id,
        companyName: data.companyName,
        cnpj: data.cnpj,
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        street: data.street,
        complement: data.complement ?? undefined,
      });
    } catch {
      toast.error("Erro ao atualizar empresa, tente novamente mais tarde");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (selectedCompany) {
            handleUpdateCompany(data);
            return;
          }

          handleCreateCompany(data);
        })}
        className="min-h-[88vh] flex flex-col gap-6 relative w-full h-full"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="Digite o CNPJ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="Digite o CEP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Digite a cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Digite o estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Digite o bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Digite a rua" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input placeholder="Digite o complemento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SheetFooter className="sticky bg-gray-200 rounded-sm z-10 p-2 bottom-0 w-full">
          <Button disabled={form.formState.isLoading} type="submit">
            Enviar
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
