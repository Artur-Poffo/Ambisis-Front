import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { EnvironmentalLicense } from "../../../../../../../types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { externalApi } from "@/lib/axios";
import { useState } from "react";
import { CreateOrUpdateEnvironmentalLicenseSheet } from "../CreateOrUpdateEnvironmentalLicenseSheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EnvironmentalLicenseCardProps {
  environmentalLicense: EnvironmentalLicense;

  onUpdate: (license: EnvironmentalLicense) => void;
  onDelete: (license: EnvironmentalLicense) => void;
}

export function EnvironmentalLicenseCard({
  environmentalLicense,
  onUpdate,
  onDelete,
}: EnvironmentalLicenseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteEnvironmentalLicense() {
    try {
      setIsDeleting(true);
      await externalApi.delete(
        `/environmental-licenses/${environmentalLicense.id}`
      );
      onDelete(environmentalLicense);
    } catch {
      console.log("Erro ao deletar licença ambiental");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-emerald-500">
            {environmentalLicense.licenseNumber}
          </CardTitle>
          <CardDescription>
            {environmentalLicense.environmentalAgency}
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <CreateOrUpdateEnvironmentalLicenseSheet
            selectedEnvironmentalLicense={environmentalLicense}
            onUpdate={onUpdate}
          >
            <Button variant={"outline"}>
              <Pencil />
            </Button>
          </CreateOrUpdateEnvironmentalLicenseSheet>

          <Button
            className="hover:text-red-500  hover:bg-red-300/20 transition-colors"
            variant={"outline"}
            onClick={handleDeleteEnvironmentalLicense}
            disabled={isDeleting}
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p>
          Emitido em:{" "}
          {format(new Date(environmentalLicense.issuedAt), "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </p>
        <p>
          Válido até:{" "}
          {format(new Date(environmentalLicense.validUntil), "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </p>
      </CardContent>
    </Card>
  );
}
