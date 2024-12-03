import dynamic from "next/dynamic";
import { ImSpinner } from "react-icons/im";
import Breadcrumbs from "@/components/Breadcrumbs";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";
import CommercialFiltersWithSalesList from "@/components/CommercialFiltersWithSalesList";

export const metadata = {
  title: "Ontario Properties | WestGTAHomes.ca",
  description:
    "Explore resale properties across Ontario. Find your next home or investment opportunity.",
  keywords: "Ontario real estate, resale properties, low-rise buildings",
};

const page = async ({ params }) => {
  const INITIAL_LIMIT = 30;
  const breadcrumbItems = [
    { label: "WestGTAHomes.ca", href: "/" },
    { label: "ON", href: null },
  ];
  return (
    <div className="">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container-fluid">
        <CommercialFiltersWithSalesList
          {...{
            INITIAL_LIMIT,
          }}
        />
      </div>
      <CanadianCitiesShowcase />
    </div>
  );
};

export default page;
