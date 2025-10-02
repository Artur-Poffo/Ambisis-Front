import { useForm } from "react-hook-form";
import {
  createOrUpdateEnvironmentalLicenseFormSchema,
  CreateOrUpdateEnvironmentalLicenseFormValue,
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
import {
  Company,
  EnvironmentalLicense,
} from "../../../../../../../../../types";
import { toast } from "sonner";
import { externalApi } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

interface CreateOrUpdateEnvironmentalLicenseFormProps {
  selectedEnvironmentalLicense?: EnvironmentalLicense;
  selectedCompanyIdToCreateLicense?: string;

  onCreate?: (license: EnvironmentalLicense) => void;
  onUpdate?: (license: EnvironmentalLicense) => void;
}

export function CreateOrUpdateEnvironmentalLicenseForm({
  selectedEnvironmentalLicense,
  selectedCompanyIdToCreateLicense,
  onCreate,
  onUpdate,
}: CreateOrUpdateEnvironmentalLicenseFormProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

  const form = useForm<CreateOrUpdateEnvironmentalLicenseFormValue>({
    resolver: zodResolver(createOrUpdateEnvironmentalLicenseFormSchema),
    defaultValues: {
      licenseNumber: selectedEnvironmentalLicense?.licenseNumber || "",
      environmentalAgency:
        selectedEnvironmentalLicense?.environmentalAgency || "",
      companyId:
        selectedCompanyIdToCreateLicense ||
        selectedEnvironmentalLicense?.companyId ||
        "",
      issuedAt: selectedEnvironmentalLicense?.issuedAt || "",
      validUntil: selectedEnvironmentalLicense?.validUntil || "",
    },
  });

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companiesResponse = await externalApi.get<{
          companies: Company[];
        }>("/companies");
        setCompanies(companiesResponse.data.companies);
      } catch {
        toast.error("Erro ao carregar empresas, tente novamente mais tarde");
      }
    }

    fetchCompanies();
  }, []);

  async function handleCreateEnvironmentalLicense(
    data: CreateOrUpdateEnvironmentalLicenseFormValue
  ) {
    try {
      const createLicenseResponse = await externalApi.post<{
        licenseId: string;
      }>("/environmental-licenses", {
        licenseNumber: data.licenseNumber,
        environmentalAgency: data.environmentalAgency,
        companyId: data.companyId,
        issuedAt: data.issuedAt,
        validUntil: data.validUntil,
      });

      const { licenseId } = createLicenseResponse.data;

      onCreate?.({
        id: licenseId,
        licenseNumber: data.licenseNumber,
        environmentalAgency: data.environmentalAgency,
        companyId: data.companyId,
        issuedAt: data.issuedAt,
        validUntil: data.validUntil,
      });
    } catch {
      toast.error(
        "Erro ao criar licença ambiental, tente novamente mais tarde"
      );
    }
  }

  async function handleUpdateEnvironmentalLicense(
    data: CreateOrUpdateEnvironmentalLicenseFormValue
  ) {
    if (!selectedEnvironmentalLicense) return;

    try {
      await externalApi.put(
        `/environmental-licenses/${selectedEnvironmentalLicense.id}`,
        {
          licenseNumber: data.licenseNumber,
          environmentalAgency: data.environmentalAgency,
          companyId: data.companyId,
          issuedAt: data.issuedAt,
          validUntil: data.validUntil,
        }
      );

      onUpdate?.({
        id: selectedEnvironmentalLicense.id,
        licenseNumber: data.licenseNumber,
        environmentalAgency: data.environmentalAgency,
        companyId: data.companyId,
        issuedAt: data.issuedAt,
        validUntil: data.validUntil,
      });
    } catch {
      toast.error(
        "Erro ao atualizar licença ambiental, tente novamente mais tarde"
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (selectedEnvironmentalLicense) {
            handleUpdateEnvironmentalLicense(data);
            return;
          }

          handleCreateEnvironmentalLicense(data);
        })}
        className="min-h-[88vh] flex flex-col gap-6 relative w-full h-full"
      >
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número da Licença</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número da licença" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="environmentalAgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agência Ambiental</FormLabel>
              <FormControl>
                <Input placeholder="Digite a agência ambiental" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!selectedEnvironmentalLicense && (
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      disabled={!!selectedCompanyIdToCreateLicense}
                      className="w-full"
                    >
                      <SelectValue placeholder="Selecione uma empresa" />
                    </SelectTrigger>

                    <SelectContent className="w-full">
                      {companies.map((company) => (
                        <SelectItem
                          key={company.companyName}
                          value={company.id}
                        >
                          {company.companyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="issuedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emitido em</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione a data de emissão"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="validUntil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Válido até</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione a data de validade"
                />
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
