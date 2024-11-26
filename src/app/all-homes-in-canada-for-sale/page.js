import SiteLinks from "@/components/SiteLinks";
import React from "react";

const page = () => {
  return <SiteLinks type={"sale"} />;
};

export async function generateMetadata() {
  return {
    title: "All homes for sale in Canada | westgtahomes.ca",
    description: "50000+ homes in Canada",
  };
}

export default page;
