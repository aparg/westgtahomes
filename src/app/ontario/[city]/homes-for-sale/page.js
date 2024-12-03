import React from "react";
import dynamic from "next/dynamic";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getSalesData } from "../../../../api/getSalesData";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const city = params.city.split("-").join(" ");
  const formattedSlug = encodeURIComponent(capitalizeFirstLetter(city));
  const salesListData = await getSalesData(0, INITIAL_LIMIT, formattedSlug);
  const saleLeaseVal = "sale";
  return (
    <>
      <div className="container-fluid mt-4">
        <div className="">
          <div className="">
            <FiltersWithSalesList
              {...{ salesListData, INITIAL_LIMIT, city, saleLeaseVal }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }, parent) {
  const formattedCity = capitalizeFirstLetter(params.city.replace("-", " "));
  return {
    ...parent,
    alternates: {
      canonical: `https://https://westgtahomes.ca/commercial/ontario/${params.city}/homes-for-sale`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    // Fix: Remove the extra comma after formattedCity string
    title: [
      `100+ ${formattedCity} Detached, Semi detached & Townhomes for sale`,
      "New Listings",
      "Westgtahomes.ca",
    ].join("|"),
    description: `Find houses for sale in ${formattedCity}, ON. Visit Westgtahomes.ca to see all the ${params.city}, ON real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
