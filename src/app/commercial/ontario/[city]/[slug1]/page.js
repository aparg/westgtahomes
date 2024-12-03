import React from "react";
import { houseType, saleLease } from "@/commercial-constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import CommercialFiltersWithSalesList from "@/components/CommercialFiltersWithSalesList";
import { plural } from "@/commercial-constant/plural";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;

  const city = params.city.split("-").join(" ");
  const INITIAL_LIMIT = 30;
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
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <CommercialFiltersWithSalesList
          {...{
            city,
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
          }}
        />
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
  const formattedCity = capitalizeFirstLetter(params.city.replace("-", " "));
  return {
    ...parent,
    alternates: {
      canonical: `https://https://westgtahomes.ca/commercial/ontario/${type}/${
        saleLeaseValue || type
      }`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `100+ ${formattedCity} ${capitalizeFirstLetter(
      type + (plural[type] || "")
    )} for Sale | New Listings | WestGTAHomes.ca `,
    description: `500+ ${formattedCity} ${type} properties for sale. Book a showing for gas stations, restaurants, motels, convenience stores and lands. Open houses available.`,
  };
}

export default page;
