import React from "react";
import SearchContent from "@/components/Pages/Search/SearchContent";

import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Search"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <SearchContent />
    </>
  );
}
