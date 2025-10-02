import { externalApi } from "@/lib/axios";
import { EnvironmentalLicense } from "../../../types";
import { EnvironmentalLicensesSection } from "@/components/EnvironmentalLicense/components/EnvironmentalLicenseSection";

export default async function EnvironmentalLicenses({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const environmentalLicensesResponse = await externalApi.get<{
    environmentalLicenses: EnvironmentalLicense[];
  }>("/environmental-licenses");
  const { environmentalLicenses } = environmentalLicensesResponse.data;

  const { createLicenseAndAttachTo } = await searchParams;

  return (
    <EnvironmentalLicensesSection
      initialEnvironmentalLicenses={environmentalLicenses}
      selectedCompanyIdToCreateLicense={createLicenseAndAttachTo}
    />
  );
}
