import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

const CityCard = ({ name, imageUrl }) => (
  <Link href={generateURL({ cityVal: name })}>
    <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
      <img
        src={imageUrl}
        alt={`${name} cityscape`}
        className="object-cover transition-transform duration-300 group-hover:scale-110 h-[350px] w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <h3 className="absolute flex justify-center w-full bottom-4 text-white text-2xl font-bold text-center">
        {name}
      </h3>
    </div>
  </Link>
);

const CanadianCitiesShowcase = () => {
  const cities = [
    { name: "Mississauga", imageUrl: "/images/mississauga.jpg" },
    { name: "Brampton", imageUrl: "/images/brampton.jpg" },
    { name: "Oakville", imageUrl: "/images/oakville.jpg" },
    { name: "Milton", imageUrl: "/images/milton.jpg" },
    { name: "Burlington", imageUrl: "/images/burlington.jpg" },
    { name: "Georgetown", imageUrl: "/images/georgetown.jpg" },
    { name: "Etobicoke", imageUrl: "/images/etobicoke.png" },
    { name: "Vaughan", imageUrl: "/images/vaughan.jpg" },
  ];

  return (
    <div className="my-[5rem] sm:my-[10rem]">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 mt-10">
          Commercial Properties for sale in{" "}
          <span className="text-primary-green">your city </span>
          <span className="text-primary-green relative">
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-gretext-primary-green rounded"></span>
          </span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore top cities across Canada
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-8">
          {cities.map((city) => (
            <CityCard
              key={city.name}
              name={city.name}
              imageUrl={city.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanadianCitiesShowcase;
