import { BASE_URL } from "..";
export const residential = {
  properties: `${BASE_URL}/odata/Property$query`,
  photos: `${BASE_URL}/odata/Media?$filter=ResourceRecordKey eq 'MLS' and MediaType eq 'image/jpeg' and MediaStatus eq 'Active'`,
  search: `${BASE_URL}/odata/Property?$filter=contains(UnparsedAddress,'$value')&$select=UnparsedAddress,StreetName,StreetNumber,StreetSuffix,City,PostalCode&$top=5`,
  statistics: `https://rets.api.ca/residential/stats/$query`,
  count: `${BASE_URL}/odata/Property?$count=true&$select=ListingKey&$query`,
  openHouse: `${BASE_URL}/odata/OpenHouse?$top=500&$orderby=OpenHouseStartTime desc`,
};

export const commercial = {
  properties: `${BASE_URL}/commercial/Properties/$query`,
  photos: `${BASE_URL}/commercialPhotos/MLS-index.jpeg`,
  statistics: `${BASE_URL}/commercial/stats/$query`,
};
