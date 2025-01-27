"use client";

import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";

const Communities = ({ salesData = {} }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
      <h1 className="text-2xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2] text-center mb-10">
        GTA Communities
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 max-w-3xl mx-auto justify-center">
        {console.log(Object.entries(salesData))}
        {Object.entries(salesData).length > 0 ? (
          Object.entries(salesData).map(([city, properties]) => (
            <div key={city} className="space-y-2 md:space-y-3">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 text-center">
                {city}
              </h2>
              <ul className="space-y-1.5 md:space-y-2 text-center">
                {properties &&
                  properties.map((property, idx) => (
                    <Link
                      key={idx}
                      href={generateURL({
                        listingIDVal: property.MLS,
                        cityVal: city,
                      })}
                    >
                      <li className="text-xs md:text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer text-center ">
                        {property.Address}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No communities available
          </p>
        )}
      </div>
    </div>
  );
};

export default Communities;
