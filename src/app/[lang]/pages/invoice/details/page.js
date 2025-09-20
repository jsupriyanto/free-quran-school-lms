import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import InvoiceDetailsContent from "@/components/Pages/Invoice/InvoiceDetailsContent";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Invoice Details"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <InvoiceDetailsContent />
    </>
  );
}
