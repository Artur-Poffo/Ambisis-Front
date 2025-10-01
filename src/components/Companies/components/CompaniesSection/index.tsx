"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Company } from "../../../../../types";
import { CompanyCard } from "./components/CompanyCard";

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

  function onDeleteCompany(company: Company) {
    setCompanies((prevCompanies) =>
      prevCompanies.filter(
        (companyToDelete) => companyToDelete.id !== company.id
      )
    );
  }

  return (
    <section id="companies" className="mt-24 flex flex-col gap-10 px-4">
      <header className="w-full flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Empresas</h2>

        <div className="w-full flex items-center gap-2">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquise pelo nome das empresas..."
          />

          <Button>Criar Empresa</Button>
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
            <CompanyCard company={company} onDelete={onDeleteCompany} />
          </li>
        ))}
      </ul>
    </section>
  );
}
