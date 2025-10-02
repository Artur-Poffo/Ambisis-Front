import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Company, EnvironmentalLicense } from "../../../../../../../types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { externalApi } from "@/lib/axios";
import { useEffect, useState } from "react";
import { CreateOrUpdateCompanySheet } from "../CreateOrUpdateCompanySheet";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CompanyCardProps {
  company: Company;

  onUpdate: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export function CompanyCard({ company, onUpdate, onDelete }: CompanyCardProps) {
  const [licenses, setLicenses] = useState<EnvironmentalLicense[]>([]);

  const [isLoadingLicenses, setIsLoadingLicenses] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchCompanyLicenses() {
      try {
        setIsLoadingLicenses(true);

        const licensesResponse = await externalApi.get<{
          environmentalLicenses: EnvironmentalLicense[];
        }>("/environmental-licenses", {
          params: {
            companyId: company.id,
          },
        });
        setLicenses(licensesResponse.data.environmentalLicenses);
      } catch (error) {
        toast.error(
          "Erro ao buscar licenças da empresa, tente novamente mais tarde"
        );
      } finally {
        setIsLoadingLicenses(false);
      }
    }

    fetchCompanyLicenses();
  }, [company.id]);

  async function handleDeleteCompany() {
    try {
      setIsDeleting(true);
      await externalApi.delete(`/companies/${company.id}`);
      onDelete(company);
    } catch {
      console.log("chupa");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col-reverse items-start lg:flex-row lg:items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-emerald-500">
              {company.companyName}
            </CardTitle>
            <CardDescription>{company.cnpj}</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <CreateOrUpdateCompanySheet
              selectedCompany={company}
              onUpdate={onUpdate}
            >
              <Button variant={"outline"}>
                <Pencil />
              </Button>
            </CreateOrUpdateCompanySheet>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="hover:text-red-500  hover:bg-red-300/20 transition-colors"
                  variant={"outline"}
                >
                  <Trash />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja deletar essa empresa?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Caso aceite deletar a empresa, não só ela como as suas
                    licenças também serão deletadas indefinidamente
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteCompany}
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-500/90"
                  >
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>

        <CardContent className="flex min-h-[180px] flex-col justify-between">
          <div>
            <p>
              {company.street}, {company.neighborhood}
            </p>
            <p>
              {company.city}, {company.state}, {company.zipCode}
            </p>
            {company.complement && <p>{company.complement}</p>}
          </div>

          {isLoadingLicenses ? (
            <Skeleton className="w-full h-[40px]" />
          ) : (
            <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start">
              <div>
                {!licenses.length && (
                  <span className="text-emerald-500 font-bold">
                    Nenhuma licença vinculada ainda?
                  </span>
                )}

                {licenses.length === 1 && (
                  <span className="text-emerald-500 font-bold">
                    {licenses[0].licenseNumber} vinculada à empresa
                  </span>
                )}

                {licenses.length > 1 && (
                  <span>
                    <strong className="text-emerald-500">
                      {licenses[0].licenseNumber} e +{licenses.length - 1}{" "}
                    </strong>
                    {licenses.length - 1 === 1 ? "licença" : "licenças"}{" "}
                    vinculadas à empresa
                  </span>
                )}
              </div>

              <Link href={`/licenses?createLicenseAndAttachTo=${company.id}`}>
                <Button variant="outline">Vincular licença</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
