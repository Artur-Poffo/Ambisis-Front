import { CompaniesSection } from "@/components/Companies/components/CompaniesSection";
import { externalApi } from "@/lib/axios";
import { Company } from "../../types";

export default async function Home() {
  const companiesResponse = await externalApi.get<{ companies: Company[] }>(
    "/companies"
  );

  const { companies } = companiesResponse.data;

  return <CompaniesSection initialCompanies={companies} />;
}
