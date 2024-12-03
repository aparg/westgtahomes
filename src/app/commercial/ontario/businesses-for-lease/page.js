import React from "react";
import dynamic from "next/dynamic";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getCommercialSalesData } from "@/api/getSalesData";
import { ImSpinner } from "react-icons/im";
import CommercialFiltersWithSalesList from "@/components/CommercialFiltersWithSalesList";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const salesListData = await getCommercialSalesData(
    0,
    INITIAL_LIMIT,
    "Toronto",
    "Restaurant"
  );
  const saleLeaseVal = "lease";
  return (
    <>
      <div className="container-fluid mt-4">
        <div className="">
          <div className="">
            <CommercialFiltersWithSalesList
              {...{ salesListData, INITIAL_LIMIT, saleLeaseVal }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://https://westgtahomes.ca/commercial/ontario/businesses-for-lease`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: [
      `100+ Ontario Restaurants, Land, Convenience Stores, Motels and Gas Stations for lease`,
      ,
      "New Listings",
      "WestGTAHomes.ca",
    ].join(" | "),
    description: `Find houses for sale in ON. Visit WestGTAHomes.ca to see all the ON real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
