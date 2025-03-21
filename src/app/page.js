import Slider from "@/components/Slider";
import { getFilteredRetsData, getSalesData } from "../api/getSalesData";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import { generateURL } from "@/helpers/generateURL";
import { fetchAllBlogPosts } from "@/api/blogs";
import HeroSection from "@/components/HeroSection";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";
import ContactForm from "@/components/ContactForm";
import PropertiesDisplayer from "@/components/PropertiesDisplayer";
import { cache } from "sharp";
import MobilePromo from "@/components/MobilePromo";
import SeeListings from "@/components/SeeListings";
import InstagramPosts from "@/components/InstagramPosts";
import Reviews from "@/components/Reviews";
import Communities from "@/components/Communities";

export const metadata = {
  title: "West GTA Homes | Resale Properties in Ontario",
  description:
    "westgtahomes or westgtahomes.ca is Canada's Top Destination for westgtahomes homes such as Townhomes, Detached & Semi Detached homes. The home listings are updated every minutes. Check out 100s of properties listed in Canada.",
  keywords: "resale, properties, Ontario, Canada, low-rise, homes",
};

export default async function Home() {
  const INITIAL_LIMIT = 4;
  const INITIAL_OFFSET = 0;
  const BURLINGTONHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Burlington"
  );
  const BRAMPTONHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Brampton"
  );
  const MISSISAUGAHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Mississauga"
  );
  const OAKVILLEHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Oakville"
  );
  const KITCHENERHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Kitchener"
  );
  const HAMILTONHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Hamilton"
  );

  // const GEORGETOWNHOMES = await getSalesData(
  //   INITIAL_OFFSET,
  //   INITIAL_LIMIT,
  //   "George town"
  // );
  const VAUGHANHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Vaughan"
  );
  const HALTONHILLSHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Halton Hills"
  );

  const MILTONHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Milton"
  );
  // const fetchFireplacesData = async () => {
  //   const response = await fetch(
  //     "https://rets.dolphy.ca/residential/Properties/?$range=minFireplacesTotal=1&$limit=4",
  //     { cache: "no-cache" }
  //   );
  //   const data = await response.json();
  //   return data.results;
  // };
  // const fetchSepEntranceData = async () => {
  //   let conditions = [];
  //   const properties = ["Basement1", "Basement2"];
  //   properties.forEach((val) =>
  //     // (conditions += `${val}=Indoor%20Pool,${val}=Outdoor%20Pool,${val}=Pool`)
  //     conditions.push(`${val}=Sep%20Entrance`)
  //   );
  //   // conditions += `&$select=TypeOwnSrch='.S.'`;
  //   const fetchString = `https://rets.dolphy.ca/residential/Properties/?$selectOr=${conditions.join(
  //     ","
  //   )}&$limit=1`;
  //   const westgtahomesOnly = [
  //     "TypeOwnSrch=.D.",
  //     "TypeOwnSrch=.A.",
  //     "TypeOwnSrch=.J.",
  //     "TypeOwnSrch=.K.",
  //   ];
  //   const results = await Promise.all(
  //     westgtahomesOnly.map(async (val) => {
  //       const response = await fetch(fetchString + `&$select=${val}`, {
  //         next: { revalidate: 43200 },
  //       });
  //       const data = await response.json();
  //       return data.results[0];
  //     })
  //   );
  //   return results;
  // };

  // const HOUSEWITHFIREPLACES = await fetchFireplacesData();
  // const HOUSEWITHSEPARATEENTRANCE = await fetchSepEntranceData();
  // const BLOGPOSTS = await fetchSomeBlogPosts({ pageSize: 4 });
  // const BLOGPOSTS = await fetchAllBlogPosts();
  {
    /* pass property propertyType:"commercial" only for commercial card slider, default is residential */
  }

  return (
    <>
      <HeroSection />
      <SeeListings />
      <MobilePromo></MobilePromo>
      <section className="mx-auto max-w-[90%]">
        <PropertyDisplaySection
          title="Explore homes in Oakville"
          subtitle=""
          exploreAllLink={generateURL({ cityVal: "Oakville" })}
        >
          <Slider data={OAKVILLEHOMES} type="resale" />
        </PropertyDisplaySection>
        <PropertyDisplaySection
          title="Explore homes in Burlington"
          subtitle={""}
          exploreAllLink={generateURL({ cityVal: "Toronto" })}
        >
          <Slider data={BURLINGTONHOMES} type="resale" />
        </PropertyDisplaySection>
        <PropertyDisplaySection
          title="Explore homes in Brampton"
          subtitle=""
          exploreAllLink={generateURL({ cityVal: "Brampton" })}
        >
          <Slider data={BRAMPTONHOMES} type="resale" />
        </PropertyDisplaySection>
        <CanadianCitiesShowcase />
        {/* <PropertiesDisplayer
          topic={"Fireplaces"}
          subtitle={
            "Where marshmallows meet their toasty fate and cold feet find their cozy soulmates."
          }
          data={HOUSEWITHFIREPLACES}
        /> */}

        {/* <PropertiesDisplayer
          topic={"Separate Entrance"}
          subtitle={
            "A house with a separate entrance is like a mullet haircut - business in the front, party in the back."
          }
          bg="#454536"
          imageGradient="#99531b"
          data={HOUSEWITHSEPARATEENTRANCE}
        /> */}
        <Communities
          salesData={{
            Mississauga:
              MISSISAUGAHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],

            Hamilton:
              HAMILTONHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],
            Kitchener:
              KITCHENERHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],

            Vaughan:
              VAUGHANHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],
            Milton:
              MILTONHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],
            Oakville:
              OAKVILLEHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],
            Burlington:
              BURLINGTONHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],
            Brampton:
              BRAMPTONHOMES?.map((val) => {
                return { Address: val.Address, MLS: val.MLS };
              }) || [],
          }}
        />
        <PropertyDisplaySection
          title="Explore homes in Hamilton"
          subtitle=""
          exploreAllLink={generateURL({ cityVal: "Hamilton" })}
        >
          <Slider data={HAMILTONHOMES} type="resale" />
        </PropertyDisplaySection>
        {/* <PropertyDisplaySection
          title="Explore homes in Georgetown"
          subtitle=""
          exploreAllLink={generateURL({ cityVal: "Mississauga" })}
        >
          <Slider data={GEORGETOWNHOMES} type="resale" />
        </PropertyDisplaySection> */}
        <PropertyDisplaySection
          title="Explore homes in Halton Hills"
          subtitle=""
          exploreAllLink={generateURL({ cityVal: "Halton Hills" })}
        >
          <Slider data={HALTONHILLSHOMES} type="resale" />
        </PropertyDisplaySection>

        <PropertyDisplaySection title="Follow us on Instagram">
          <InstagramPosts />
        </PropertyDisplaySection>

        <div className="mt-10 sm:mt-20">
          <Reviews />
        </div>
        {/* <PropertyDisplaySection
          title="The westgtahomes Insights"
          subtitle=""
          exploreAllLink="/blogs"
        >
          <Slider data={BLOGPOSTS.slice(0, 4)} type="blog" />
        </PropertyDisplaySection> */}
        {/* <div className="flex flex-col items-center mt-40 sm:mt-40"></div> */}
        <ContactForm />
      </section>
      {/* pass props type="commercial" only for commercial card slider, default is residential */}
    </>
  );
}
