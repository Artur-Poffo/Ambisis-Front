"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { EnvironmentalLicense } from "../../../../../types";
import { EnvironmentalLicenseCard } from "./components/EnvironmentalLicenseCard";
import { CreateOrUpdateEnvironmentalLicenseSheet } from "./components/CreateOrUpdateEnvironmentalLicenseSheet";

interface EnvironmentalLicenseSectionProps {
  initialEnvironmentalLicenses: EnvironmentalLicense[];
  selectedCompanyIdToCreateLicense?: string;
}

export function EnvironmentalLicensesSection({
  initialEnvironmentalLicenses,
  selectedCompanyIdToCreateLicense,
}: EnvironmentalLicenseSectionProps) {
  const [environmentalLicenses, setEnvironmentalLicenses] = useState<
    EnvironmentalLicense[]
  >(initialEnvironmentalLicenses || []);
  const [filteredEnvironmentalLicenses, setFilteredEnvironmentalLicenses] =
    useState<EnvironmentalLicense[]>(environmentalLicenses || []);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredEnvironmentalLicenses(
      environmentalLicenses.filter((environmentalLicense) =>
        environmentalLicense.licenseNumber
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, environmentalLicenses]);

  function onEnvironmentalLicenseCreated(
    environmentalLicense: EnvironmentalLicense
  ) {
    setEnvironmentalLicenses((prevEnvironmentalLicenses) => [
      ...prevEnvironmentalLicenses,
      environmentalLicense,
    ]);
  }

  function onEnvironmentalLicenseUpdated(
    environmentalLicense: EnvironmentalLicense
  ) {
    setEnvironmentalLicenses((prevEnvironmentalLicenses) => {
      const environmentalLicenseToUpdateIndex =
        prevEnvironmentalLicenses.findIndex(
          (environmentalLicenseToUpdate) =>
            environmentalLicenseToUpdate.id === environmentalLicense.id
        );

      if (environmentalLicenseToUpdateIndex === -1) {
        return prevEnvironmentalLicenses;
      }

      const updatedEnvironmentalLicense = [...prevEnvironmentalLicenses];
      updatedEnvironmentalLicense[environmentalLicenseToUpdateIndex] =
        environmentalLicense;

      return updatedEnvironmentalLicense;
    });
  }

  function onEnvironmentalLicenseDeleted(
    environmentalLicense: EnvironmentalLicense
  ) {
    setEnvironmentalLicenses((prevEnvironmentalLicenses) =>
      prevEnvironmentalLicenses.filter(
        (environmentalLicenseToDelete) =>
          environmentalLicenseToDelete.id !== environmentalLicense.id
      )
    );
  }

  return (
    <section id="environmental_licenses" className="flex flex-col gap-10">
      <header className="w-full flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Licenças Ambientais</h2>

        <div className="w-full flex items-center gap-2">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquise pelo número das licenças..."
          />

          <CreateOrUpdateEnvironmentalLicenseSheet
            onCreate={onEnvironmentalLicenseCreated}
            defaultOpen={!!selectedCompanyIdToCreateLicense}
            selectedCompanyIdToCreateLicense={selectedCompanyIdToCreateLicense}
          >
            <Button>Criar Licença Ambiental</Button>
          </CreateOrUpdateEnvironmentalLicenseSheet>
        </div>
      </header>

      {!filteredEnvironmentalLicenses.length && (
        <div className="flex w-full flex-col items-center mt-10">
          <h3 className="text-lg font-bold">Nenhuma licença encontrada</h3>
          <p>Verifique seu filtro e crie uma licença</p>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredEnvironmentalLicenses.map((environmentalLicense) => (
          <li key={environmentalLicense.id}>
            <EnvironmentalLicenseCard
              environmentalLicense={environmentalLicense}
              onUpdate={onEnvironmentalLicenseUpdated}
              onDelete={onEnvironmentalLicenseDeleted}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
