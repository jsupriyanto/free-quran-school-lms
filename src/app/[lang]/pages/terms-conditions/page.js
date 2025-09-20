import React from "react";
import TermsConditionsContent from "@/components/Pages/TermsConditions/TermsConditionsContent";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Terms & Conditions"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <TermsConditionsContent />
    </>
  );
}
