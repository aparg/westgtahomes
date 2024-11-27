"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { searchProperties } from "../api/searchProperties";
import debounce from "lodash.debounce";
import Autosuggest from "./Autosuggest";
import { Button } from "@nextui-org/react";
import useDeviceView from "@/helpers/useDeviceView";

const SearchBar = ({
  numberOfSuggestions = 10,
  small = false,
  placeholder = "Search by address, city, neighbourhood or postal code",
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { isMobileView } = useDeviceView();
  // Debouncing
  const handleChange = async (value) => {
    await getSuggestions(value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(async (value) => await handleChange(value), 100);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  const getSuggestions = async (searchTerm) => {
    const inputValueLowerCase = searchTerm?.trim()?.toLowerCase();
    const filteredCities = citiesWithProvinces.filter((data) =>
      data.city.toLowerCase().includes(inputValueLowerCase)
    );
    // return filteredCities;
    const filteredProperties = await searchProperties(searchTerm);
    // const addressArray = filteredProperties.map((property, idx) => {
    //   return property.Address;
    // });
    setSuggestions([...filteredCities, ...filteredProperties]);
  };
  const citiesWithProvinces = [
    { city: "Brampton", province: "Ontario" },

    { city: "Burlington", province: "Ontario" },

    { city: "Hamilton", province: "Ontario" },

    { city: "Kitchener", province: "Ontario" },

    { city: "Mississauga", province: "Ontario" },
    { city: "Vaughan", province: "Ontario" },
    { city: "Milton", province: "Ontario" },
    { city: "Oakville", province: "Ontario" },
  ];

  //style for input box
  let inputBoxClass = [];
  if (!small && !displaySuggestions) {
    inputBoxClass.push("border-2 border-black");
  } else if (!displaySuggestions) {
    inputBoxClass.push("border-1 border-gray-300");
  }
  console.log(searchTerm.length);
  if (displaySuggestions && searchTerm.length > 0) {
    inputBoxClass.push("border-1 border-black rounded-t-[28px]");
  } else {
    inputBoxClass.push("rounded-[28px] border-black border-1");
  }

  return (
    <div className={`flex flex-col relative rounded-[28px]`}>
      <div
        className={`w-full h-full flex overflow-hidden ${inputBoxClass.join(
          " "
        )} shadow-none! z-10`}
      >
        <input
          className={`w-full ${
            small ? "py-1" : "py-3"
          } px-2 focus:outline-none focus:shadow-2xl text-center placeholder:text-center sm:placeholder:text-medium`}
          placeholder={displaySuggestions ? "" : placeholder}
          onChange={(e) => {
            setDisplaySuggestions(true);
            setSearchTerm(e.target.value);
            debouncedResults(e.target.value);
          }}
          onFocus={() => {
            setDisplaySuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setDisplaySuggestions(false), 200);
          }}
          value={searchTerm}
        />
        <div className="flex items-center pr-1 pl-0 justify-center bg-white">
          {/* <CgSearch size="1.25rem" /> */}
          {!small && !isMobileView ? (
            <Button className={`bg-black rounded-full text-white font-medium`}>
              {" "}
              Search{" "}
            </Button>
          ) : small ? (
            <CgSearch size="1.25rem" className="mr-2" />
          ) : (
            <CgSearch size="1.75rem" className="mr-2" />
          )}
        </div>
      </div>
      <div className="relative">
        {displaySuggestions && searchTerm.length > 0 && (
          <Autosuggest
            displaySuggestions={displaySuggestions}
            searchTerm={searchTerm}
            suggestions={suggestions}
            numberOfSuggestions={numberOfSuggestions}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
