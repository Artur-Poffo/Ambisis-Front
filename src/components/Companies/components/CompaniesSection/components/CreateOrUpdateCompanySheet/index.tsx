import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ReactNode, useState } from "react";
import { Company } from "../../../../../../../types";
import { CreateOrUpdateCompanyForm } from "./components/CreateOrUpdateCompanyForm";

interface CreateOrUpdateCompanySheetProps {
  children: ReactNode;

  selectedCompany?: Company;

  onCreate?: (company: Company) => void;
  onUpdate?: (company: Company) => void;
}

export function CreateOrUpdateCompanySheet({
  children,

  selectedCompany,

  onCreate,
  onUpdate,
}: CreateOrUpdateCompanySheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const mode: "create" | "update" = selectedCompany ? "update" : "create";

  const sheetTextsByMode: Record<
    typeof mode,
    { title: string; description: string }
  > = {
    create: {
      title: "Crie uma nova empresa",
      description: "Preencha os campos abaixo e cadastre uma nova empresa",
    },
    update: {
      title: "Atualize os dados da empresa",
      description: "Atualize informações da empresa selecionada",
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

        <CreateOrUpdateCompanyForm
          selectedCompany={selectedCompany}
          onCreate={(company) => {
            onCreate?.(company);
            setIsSheetOpen(false);
          }}
          onUpdate={(company) => {
            onUpdate?.(company);
            setIsSheetOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
