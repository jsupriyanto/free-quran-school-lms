import React from "react";

import PageTitle from "@/components/Common/PageTitle";
import AllProjects from "@/components/Projects/AllProjects";

const Page = () => {
  return (
    <>
      <PageTitle
        pageTitle="Projects"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <AllProjects />
    </>
  );
};

export default Page;
