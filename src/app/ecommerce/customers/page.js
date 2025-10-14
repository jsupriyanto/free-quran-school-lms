import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import CustomersLists from "@/components/eCommerce/Customers/CustomersLists";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Customers"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <CustomersLists />
    </>
  );
}
