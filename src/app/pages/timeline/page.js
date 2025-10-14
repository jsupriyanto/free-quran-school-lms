import React from "react";
import TimelineStyle1 from "@/components/Pages/Timeline/TimelineStyle1";
import TimelineStyle2 from "@/components/Pages/Timeline/TimelineStyle2";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Timeline"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <TimelineStyle1 />

      <TimelineStyle2 />
    </>
  );
}
