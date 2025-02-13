import { residential } from "./routes/fetchRoutes";

export const searchProperties = async (inputValue) => {
  console.log(inputValue);
  const response = await fetch(
    residential.properties.replace(
      "$query",
      "?$filter=contains(UnparsedAddress,'"
    ) +
      inputValue +
      "')&$select=UnparsedAddress,City&$top=5"
  );
  const searchedProperties = await response.json();
  /* console.log(searchedProperties); */
  return searchedProperties.results;
};
