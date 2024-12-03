"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "@/helpers/TimeAgo";
import { residential } from "../api/routes/fetchRoutes";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";
import useDeviceView from "@/helpers/useDeviceView";
import MobileCityResoCard from "./MobileCityResoCard";
import { priceFormatter } from "@/helpers/priceFormatter";
import Image from "next/image";
import Favorite from "./Favorite";
import { toggle } from "@nextui-org/react";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const ResaleCard = ({ curElem, small = false, showDecreasedPrice = false }) => {
  // const [address, setAddress] = useState("");

  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const imgSrc = residential.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  // const streetAndMLS = curElem.StreetName
  //   ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
  //       curElem.StreetAbbreviation
  //     }-${curElem.MLS}`
  //   : curElem.MLS;

  const streetAndMLS = (() => {
    const parts = [];

    if (curElem.Street) {
      parts.push(curElem.Street);
    }

    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElem.StreetAbbreviation) {
      parts.push(curElem.StreetAbbreviation);
    }

    if (curElem.MLS) {
      parts.push(curElem.MLS);
    }

    return parts.filter(Boolean).join("-");
  })();

  // Favoriting
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (
      window.localStorage.getItem("favorites") &&
      JSON.parse(window.localStorage.getItem("favorites")).includes(curElem.MLS)
    ) {
      setIsFavorite(true);
    }
  });
  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favoriteValue = window.localStorage.getItem("favorites");
    if (!isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      favorites.push(curElem.MLS);
      const value = JSON.stringify(favorites);
      window.localStorage.setItem("favorites", value);
    } else if (isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      const value = JSON.stringify(
        favorites.filter((val) => val !== curElem.MLS)
      );
      window.localStorage.setItem("favorites", value);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <section className="relative bg-white border border-gray-200 hover:border-primary-green hover:shadow-lg rounded-lg transition-all duration-300 overflow-hidden">
      <Link
        href={generateURL({
          cityVal: curElem.Municipality,
          listingIDVal: streetAndMLS,
        })}
        className="text-black"
      >
        <div className="h-full w-full">
          <div className="flex flex-col">
            {/* Image Container */}
            <div className="relative h-56 sm:h-64">
              <img
                className="object-cover w-full h-full"
                src={imgSrc}
                width="900"
                height="800"
                alt="property image"
                onError={handleImageError}
              />

              {/* Property Tags */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {curElem.TypeOwn1Out}
                </span>
                {curElem.ApproxSquareFootage && (
                  <span className="bg-gray-800/80 text-white px-2 py-1 rounded-full text-xs font-medium hidden sm:block">
                    {curElem.ApproxSquareFootage} Sq.Ft.
                  </span>
                )}
              </div>
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4">
              {/* Price and Timestamp */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3 gap-1">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {price}
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span className="text-gray-600 text-sm"> /month</span>
                  )}
                </h2>
                <span className="text-[10px] sm:text-xs text-gray-500">
                  <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                </span>
              </div>

              {/* Property Features */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-3">
                {curElem.Bedrooms && (
                  <div className="flex items-center text-gray-700">
                    <img
                      src="/resale-card-img/bedrooms.svg"
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      alt="bedrooms"
                    />
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      {Math.floor(curElem.Bedrooms)} Beds
                    </span>
                  </div>
                )}
                {curElem.Washrooms && (
                  <div className="flex items-center text-gray-700">
                    <img
                      src="/resale-card-img/bathrooms.svg"
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      alt="washrooms"
                    />
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      {Math.floor(curElem.Washrooms)} Baths
                    </span>
                  </div>
                )}
                {curElem.GarageSpaces && (
                  <div className="flex items-center text-gray-700">
                    <img
                      src="/resale-card-img/garage.svg"
                      className={`${small ? "w-3 h-3" : "w-4 h-4"} mr-1`}
                      alt="garage"
                    />
                    <span
                      className={`${
                        small ? "text-xs" : "text-sm"
                      } whitespace-nowrap`}
                    >
                      {Math.floor(curElem.GarageSpaces)} Garage
                    </span>
                  </div>
                )}
              </div>

              {/* Address */}
              <p className="text-gray-600 text-sm mb-2">
                {curElem.StreetName ? (
                  `${curElem.Street} ${curElem.StreetName} ${curElem.StreetAbbreviation} ${curElem.Municipality}, Ontario`
                ) : (
                  <span className="p-4"></span>
                )}
              </p>

              {/* MLS and Brokerage Info */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">MLS® {curElem.MLS}</p>
                <p className="text-xs text-gray-500">
                  Listed by {curElem.ListBrokerage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ResaleCard;
