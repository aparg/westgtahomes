import { BASE_URL } from "..";
export const residential = {
  properties: `${BASE_URL}/odata/Property$query`,
  photos: `${BASE_URL}/odata/Media?$filter=ResourceRecordKey eq 'MLS' and MediaType eq 'image/jpeg' and MediaStatus eq 'Active'`,
  search: `${BASE_URL}/odata/Property?$filter=StreetName has '$value' or PostalCode has '$value' or ListingKey eq '$value' or contains(City,'$value')&$select=UnparsedAddress,City&$top=5`,
};

export const commercial = {
  properties: `${BASE_URL}/commercial/Properties/$query`,
  photos: `${BASE_URL}/commercialPhotos/MLS-index.jpeg`,
  statistics: `${BASE_URL}/commercial/stats/$query`,
};
