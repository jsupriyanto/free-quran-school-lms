import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import SupportForm from "@/components/Pages/Support/SupportForm";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Support"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      {/* SupportForm */}
      <SupportForm />
    </>
  );
}
