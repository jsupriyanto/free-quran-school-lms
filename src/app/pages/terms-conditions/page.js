import React from "react";
import TermsConditionsContent from "@/components/Pages/TermsConditions/TermsConditionsContent";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Terms & Conditions"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <TermsConditionsContent />
    </>
  );
}
