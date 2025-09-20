import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import InvoiceLists from "@/components/Pages/Invoice/InvoiceLists";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Invoice"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <InvoiceLists />
    </>
  );
}
