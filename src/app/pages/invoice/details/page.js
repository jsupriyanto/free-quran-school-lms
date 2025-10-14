import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import InvoiceDetailsContent from "@/components/Pages/Invoice/InvoiceDetailsContent";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Invoice Details"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <InvoiceDetailsContent />
    </>
  );
}
