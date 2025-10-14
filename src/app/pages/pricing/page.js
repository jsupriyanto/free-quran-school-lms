import React from "react";
import PricingPlanStyle1 from "@/components/Pages/Pricing/PricingPlanStyle1";
import PricingPlanStyle2 from "@/components/Pages/Pricing/PricingPlanStyle2";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Pricing"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <PricingPlanStyle1 />

      <PricingPlanStyle2 />
    </>
  );
}
