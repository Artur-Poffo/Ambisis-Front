import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ReactNode, useState } from "react";
import { EnvironmentalLicense } from "../../../../../../../types";
import { CreateOrUpdateEnvironmentalLicenseForm } from "./components/CreateOrUpdateEnvironmentalLicenseForm";

interface CreateOrUpdateEnvironmentalLicenseSheetProps {
  children: ReactNode;
  defaultOpen?: boolean;
  selectedCompanyIdToCreateLicense?: string;

  selectedEnvironmentalLicense?: EnvironmentalLicense;

  onCreate?: (license: EnvironmentalLicense) => void;
  onUpdate?: (license: EnvironmentalLicense) => void;
}

export function CreateOrUpdateEnvironmentalLicenseSheet({
  children,
  defaultOpen = false,
  selectedCompanyIdToCreateLicense,

  selectedEnvironmentalLicense,

  onCreate,
  onUpdate,
}: CreateOrUpdateEnvironmentalLicenseSheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(defaultOpen || false);

  const mode: "create" | "update" = selectedEnvironmentalLicense
    ? "update"
    : "create";

  const sheetTextsByMode: Record<
    typeof mode,
    { title: string; description: string }
  > = {
    create: {
      title: "Crie uma nova licença ambiental",
      description:
        "Preencha os campos abaixo e cadastre uma nova licença ambiental",
    },
    update: {
      title: "Atualize os dados da licença ambiental",
      description: "Atualize informações da licença ambiental selecionada",
    },
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col gap-10">
        <SheetHeader>
          <SheetTitle>{sheetTextsByMode[mode].title}</SheetTitle>
          <SheetDescription>
            {sheetTextsByMode[mode].description}
          </SheetDescription>
        </SheetHeader>

        <CreateOrUpdateEnvironmentalLicenseForm
          selectedEnvironmentalLicense={selectedEnvironmentalLicense}
          selectedCompanyIdToCreateLicense={selectedCompanyIdToCreateLicense}
          onCreate={(license) => {
            onCreate?.(license);
            setIsSheetOpen(false);
          }}
          onUpdate={(license) => {
            onUpdate?.(license);
            setIsSheetOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
