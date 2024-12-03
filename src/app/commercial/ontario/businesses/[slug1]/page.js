import React from "react";
import { houseType, saleLease } from "@/commercial-constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import CommercialFiltersWithSalesList from "@/components/CommercialFiltersWithSalesList";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  // if (Object.keys(saleLease).includes(params.slug1)) {
  //   saleLeaseValue = params.slug1;
  // }
  // if (Object.keys(houseType).includes(params.slug1)) {
  //   type = houseType[params.slug1].name;
  // }
  const splitData = params.slug1.split("-");
  splitData.forEach((data) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data].name;
    }
    if (saleLeaseValue && type) return;
  });
  const isValidSlug = saleLeaseValue || type;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="">
        <CommercialFiltersWithSalesList
          {...{
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue || Object.keys(saleLease)[0],
            requiredType: type,
            filter: type || "",
          }}
        />
        <CanadianCitiesShowcase />
      </div>
    );
  return <></>;
};

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue;
  let type;
  const splitData = params.slug1.split("-");
  splitData.forEach((data) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data].name;
    }
    if (saleLeaseValue && type) return;
  });
  return {
    ...parent,
    alternates: {
      canonical: `https://https://westgtahomes.ca/commercial/ontario/businesses/${params.slug1}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `100+ Ontario properties for Sale | New Listings | WestGTAHomes.ca `,
    description: `500+ Ontario ${type} for sale. Book a showing for gas stations, restaurants, motels, convenience stores and lands. Open houses available.`,
  };
}

export default page;
