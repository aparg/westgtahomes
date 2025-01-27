import dynamic from "next/dynamic";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { residential } from "../../../../../api/routes/fetchRoutes";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import {
  fetchDataFromMLS,
  fetchStatsFromMLS,
  getImageUrls,
  getSalesData,
} from "../../../../../api/getSalesData";
import BookShowingForm from "@/components/BookShowingForm";
// const Map = dynamic(() => import("@/components/Map"), { ssr: false });
// import Map from "@/components/Map";
import PropertyPage from "@/components/PropertyPage";
import BookingDate from "@/components/BookingDate";
import FAQ from "@/components/FAQ";
import MortgageCalculator from "@/components/MortgageCalculator";
import Image from "next/image";
import Slider from "@/components/Slider";
import Breadcrumbs from "@/components/Breadcrumbs";
import CreateSchema from "@/helpers/CreateSchema";
import { slugGenerator } from "@/helpers/slugGenerator";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import PriceButton from "@/components/PriceButton";
import formatCurrency from "@/helpers/formatCurrency";
import Carousel from "@/components/Carousel";
import { generateURL } from "@/helpers/generateURL";
import MobileGallery from "@/components/MobileGallery";
import Thumbnails from "@/components/Thumbnails";
import TimeAgo from "@/helpers/TimeAgo";
import { houseType } from "@/constant";
// import { getNotes } from "@/helpers/getNotes";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 4;

const fetchData = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = residential.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const data = await fetchDataFromMLS(listingID);
  return data;
};

const page = async ({ params }) => {
  const { city, listingID } = await params;
  const cityValue = city.split("-").join(" ");
  const formattedSlug = capitalizeFirstLetter(cityValue);
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;
  let main_data = await fetchData(listingIDValue); //always a single object inside the array
  const newSalesData = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    formattedSlug,
    main_data?.ProeprtySubType
  );
  const imageURLs = await getImageUrls({ MLS: main_data?.ListingKey });

  const breadcrumbItems = [
    { label: "Ontario", href: "/ontario" },
    { label: formattedSlug, href: generateURL({ cityVal: cityValue }) },
    {
      label: `${main_data.StreetNumber} ${main_data.StreetName}${" "}
    ${main_data.StreetSuffix}`,
      href: "#",
    },
  ];

  // const address = `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix}`;
  const address = [
    main_data?.Street,
    main_data?.StreetName,
    main_data?.StreetSuffix,
  ]
    .filter(Boolean)
    .join(" ");

  // const notes = await getNotes();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
              const navbar = document.querySelector('.main-navbar');
              if (!navbar) return;
              
              const currentScroll = window.pageYOffset;
              if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
              } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
              }
              lastScroll = currentScroll;
            });
          `,
        }}
      />
      <div className="flex justify-center min-[2000px]:max-w-[68%] mx-auto">
        <div>
          <script
            key={main_data.MLS}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(CreateSchema(main_data)),
            }}
          />
          <div className="pt-md-3 pt-0 ">
            <div className="sticky top-0 z-[999]">
              <Breadcrumbs items={breadcrumbItems} />
              {/* <Thumbnails setCurrentImageIndex={setCurrentImageIndex} /> */}
            </div>
            <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2 relative">
              <div className="hidden sm:block relative">
                <Gallery data={imageURLs} />
                <div className="space-x-2 order-2 sm:order-1 absolute bottom-2 left-2">
                  <button className="bg-badge-color p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                    <TimeAgo
                      modificationTimestamp={main_data.OriginalEntryTimestamp}
                    />
                  </button>
                  <button className="bg-badge-color p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                    <span>{main_data.PropertySubType}</span>
                  </button>
                </div>
              </div>
              {/* Carousel is only for mobile. */}
              <Carousel urls={imageURLs} />
              <div className=" w-full flex justify-center pt-0 sm:pt-4 relative">
                <div className="grid sm:grid-cols-6 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-6 gap-y-12 sm:gap-y-0 relative">
                  <div className={`sm:col-span-4 col-span-4 col-md-8 `}>
                    <PropertyPage {...{ main_data }} />

                    <BookingDate bannerImage={imageURLs[0]} />
                    {/* <NotesForProperties notes={notes} /> */}
                    {/* <div className="z-20 relative mt-12 sm:mt-24">
                      <h2 className="font-extrabold text-2xl sm:text-4xl mb-2">
                        Map View
                      </h2>
                      <Map main_data={main_data} />
                    </div> */}
                  </div>

                  <div
                    className="sm:col-span-2 col-span-2 relative"
                    id="contact"
                  >
                    <BookShowingForm
                      address={address + `, ${main_data?.City}, Ontario`}
                    ></BookShowingForm>
                  </div>
                  <div className="mt-24 mb-10 col-span-4">
                    <FAQ main_data={main_data} />
                  </div>
                </div>
              </div>
              {formattedSlug && newSalesData?.length > 0 && (
                <section className="additonal__listing w-full mx-auto mt-24">
                  <PropertyDisplaySection
                    title={`Similar Homes nearby in ${
                      main_data?.City || "Ontario"
                    }`}
                    subtitle={`Check out 100+ listings near this property. Listings updated daily`}
                    exploreAllLink={generateURL({
                      houseTypeVal:
                        houseType[
                          Object.keys(houseType).find(
                            (key) =>
                              houseType[key].value == main_data?.ProeprtySubType
                          )
                        ]?.name,
                      saleLeaseVal: main_data?.TransactionType,
                      cityVal: city,
                    })}
                  >
                    <Slider data={newSalesData} type="resale" />
                  </PropertyDisplaySection>
                </section>
              )}

              <PriceButton price={formatCurrency(main_data?.ListPrice)} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  const { listingID } = await params;
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;
  const main_data = await fetchData(listingIDValue);
  const imageURLs = getImageUrls(listingIDValue);
  return {
    ...parent,
    alternates: {
      canonical: `https://westgtahomes.ca/listings/${slugGenerator(main_data)}`,
    },
    openGraph: {
      images: imageURLs[0],
    },
    title: `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix}`,
    description: `${main_data?.PropertySubType}.${main_data?.City}`,
  };
}
