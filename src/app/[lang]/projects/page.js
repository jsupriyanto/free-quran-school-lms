import React from "react";

import PageTitle from "@/components/Common/PageTitle";
import AllProjects from "@/components/Projects/AllProjects";

const Page = ({ params: { lang } }) => {
  return (
    <>
      <PageTitle
        pageTitle="Projects"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <AllProjects />
    </>
  );
};

export default Page;
