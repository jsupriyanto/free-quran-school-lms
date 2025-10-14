import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import GoogleMap from "@/components/Pages/Maps/GoogleMap"; 

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Maps"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      {/* GoogleMap */}
      <GoogleMap />
    </>
  );
}
