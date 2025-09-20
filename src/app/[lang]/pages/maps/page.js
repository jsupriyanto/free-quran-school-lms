import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import GoogleMap from "@/components/Pages/Maps/GoogleMap"; 

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Maps"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      {/* GoogleMap */}
      <GoogleMap />
    </>
  );
}
