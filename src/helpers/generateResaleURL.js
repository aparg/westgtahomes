import {
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
  saleLease,
} from "@/constant";
import { isLocalStorageAvailable } from "./checkLocalStorageAvailable";
const houseTypeLinkObj = {};
Object.values(houseType).forEach((elem) => {
  if (elem.value) houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
});
export const generateURL = ({
  cityVal,
  houseTypeVal,
  saleLeaseVal,
  listingIDVal = null,
  embeddedSite = false,
  useLocalStorage = true,
  soldData = false,
  priceRange = null,
  openHouse = false,
}) => {
  const filterState =
    useLocalStorage &&
    isLocalStorageAvailable() &&
    JSON.parse(localStorage.getItem("filterState"));
  const city = cityVal?.toLowerCase().replaceAll(" ", "-");
  // const storedFilterType = Object;
  let houseType =
    houseTypeVal?.toLowerCase() || filterState?.type?.toLowerCase() || null;

  if (openHouse) {
    if (city) {
      if (listingIDVal) {
        return `/ontario/${city}/listings/open-house/${listingIDVal}`;
      }
      return `/ontario/${city}/open-houses`;
    }

    return "/ontario/open-houses";
  }
  if (houseType == "house type") {
    houseType = null; //edge case for housetype object where housetype option represents nothing
  }
  const priceRangeObj =
    priceRangesSaleProperties[priceRange] ||
    priceRangesLeaseProperties[priceRange];
  const saleLeaseType =
    Object.keys(saleLease).find((key) => key == saleLeaseVal) ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].name == saleLeaseVal)
      ?.toLowerCase() ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].name == filterState?.saleLease)
      ?.toLowerCase();
  null;
  if (listingIDVal && city)
    return `/ontario/${city}/listings/${
      soldData ? "sold/" : ""
    }${encodeURIComponent(listingIDVal)}`;
  let finalLink = `/ontario`;

  if (city) finalLink += "/" + city;

  if (!houseType && !saleLeaseType) return finalLink + "/homes-for-sale";
  if (houseType && !city) finalLink += "/homes/" + houseTypeLinkObj[houseType];
  if (houseType && city)
    finalLink += "/" + (houseTypeLinkObj[houseType] || "homes");
  if (saleLeaseType && houseType) finalLink += "-for-" + saleLeaseType;
  if (saleLeaseType && !houseType) finalLink += "/homes-for-" + saleLeaseType;
  if ((priceRange && houseType && !city) || (priceRange && city))
    finalLink += "-price-" + priceRangeObj.slug;
  else if (priceRange && !houseType)
    finalLink += "/price-" + priceRangeObj.slug;

  return encodeURI(finalLink);
};
