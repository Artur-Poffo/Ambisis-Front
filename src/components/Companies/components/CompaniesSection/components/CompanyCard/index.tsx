import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Company } from "../../../../../../../types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { externalApi } from "@/lib/axios";
import { useState } from "react";
import { CreateOrUpdateCompanySheet } from "../CreateOrUpdateCompanySheet";

interface CompanyCardProps {
  company: Company;

  onUpdate: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export function CompanyCard({ company, onUpdate, onDelete }: CompanyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

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
    <Card>
      <CardHeader className="flex items-center justify-between">
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

          <Button
            className="hover:text-red-500  hover:bg-red-300/20 transition-colors"
            variant={"outline"}
            onClick={handleDeleteCompany}
            disabled={isDeleting}
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p>
          {company.street}, {company.neighborhood}
        </p>
        <p>
          {company.city}, {company.state}, {company.zipCode}
        </p>
        {company.complement && <p>{company.complement}</p>}
      </CardContent>
    </Card>
  );
}
