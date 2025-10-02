"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Company } from "../../../../../types";
import { CompanyCard } from "./components/CompanyCard";
import { CreateOrUpdateCompanySheet } from "./components/CreateOrUpdateCompanySheet";

interface CompaniesSectionProps {
  initialCompanies: Company[];
}

export function CompaniesSection({ initialCompanies }: CompaniesSectionProps) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies || []);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(
    companies || []
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) =>
        company.companyName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, companies]);

  function onCompanyCreated(company: Company) {
    setCompanies((prevCompanies) => [...prevCompanies, company]);
  }

  function onCompanyUpdated(company: Company) {
    setCompanies((prevCompanies) => {
      const companyToUpdateIndex = prevCompanies.findIndex(
        (companyToUpdate) => companyToUpdate.id === company.id
      );

      if (companyToUpdateIndex === -1) {
        return prevCompanies;
      }

      const updatedCompanies = [...prevCompanies];
      updatedCompanies[companyToUpdateIndex] = company;

      return updatedCompanies;
    });
  }

  function onCompanyDeleted(company: Company) {
    setCompanies((prevCompanies) =>
      prevCompanies.filter(
        (companyToDelete) => companyToDelete.id !== company.id
      )
    );
  }

  return (
    <section id="companies" className="flex flex-col gap-10">
      <header className="w-full flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Empresas</h2>

        <div className="w-full flex items-center gap-2">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquise pelo nome das empresas..."
          />

          <CreateOrUpdateCompanySheet onCreate={onCompanyCreated}>
            <Button>Criar Empresa</Button>
          </CreateOrUpdateCompanySheet>
        </div>
      </header>

      {!filteredCompanies.length && (
        <div className="flex w-full flex-col items-center mt-10">
          <h3 className="text-lg font-bold">Nenhuma empresa encontrada</h3>
          <p>Verifique seu filtro e crie uma empresa</p>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCompanies.map((company) => (
          <li key={company.id}>
            <CompanyCard
              company={company}
              onUpdate={onCompanyUpdated}
              onDelete={onCompanyDeleted}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
