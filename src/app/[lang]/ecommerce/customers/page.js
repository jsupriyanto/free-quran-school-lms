import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import CustomersLists from "@/components/eCommerce/Customers/CustomersLists";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Customers"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <CustomersLists />
    </>
  );
}
