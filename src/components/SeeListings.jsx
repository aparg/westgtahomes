import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const SeeListings = () => {
  return (
    <div className="w-full bg-gray-100 py-20 flex flex-col items-center mb-[20rem]">
      <div className="max-w-[90%]">
        <h2 className=" text-center">
          <Logo />
          <span className="uppercase text-sm sm:text-md text-gray-600">
            {" "}
            real estate listings
          </span>
        </h2>
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          See listings available with us
        </h1>
        <section className="w-fit-content mx-auto grid grid-cols-1 sm:grid-cols-3 mt-8 sm:mt-16 sm:gap-x-40 sm:gap-y-0 gap-y-8">
          <div className="">
            <h2 className="font-bold text-xl mb-2 text-center">
              Popular cities near you
            </h2>
            <ul className="flex-col justify-center text-center">
              <li>
                <Link
                  href={generateURL({ cityVal: "Oakville" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Oakville Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Burlington" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Burlington Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Milton" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Milton Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Brampton" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Brampton Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Hamilton" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Hamilton Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Georgetown" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Georgetown Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Halton Hills" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Halton Hills Homes for Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-xl mb-2 text-center">
              Types of houses available
            </h2>
            <ul className="flex-col justify-center text-center">
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "semi detached" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Semi detached Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "detached" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Detached Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "duplex" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Duplex Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "triplex" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Triplex Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "town house" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Town house for Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-xl mb-2 text-center">Rent or Buy</h2>
            <ul className="flex-col justify-center text-center">
              <li>
                <Link
                  href={generateURL({ saleLeaseVal: "sale" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Ontario Homes for Sale
                </Link>
              </li>
              {/* <li>
                <Link
                  href={generateURL({ saleLeaseVal: "lease" })}
                  className="hover:text-primary-green my-4 sm:font-medium text-sm"
                >
                  Ontario Homes for Lease
                </Link>
              </li> */}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeeListings;
