import React from "react";
import SearchContent from "@/components/Pages/Search/SearchContent";

import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Search"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <SearchContent />
    </>
  );
}
