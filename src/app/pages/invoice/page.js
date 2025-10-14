import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import InvoiceLists from "@/components/Pages/Invoice/InvoiceLists";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Invoice"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <InvoiceLists />
    </>
  );
}
