import React from "react";
import OrdersLists from "@/components/eCommerce/OrdersList/OrdersLists";
import Features from "@/components/eCommerce/OrdersList/Features";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Orders List"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      {/* Features */}
      <Features />

      {/* OrdersLists */}
      <OrdersLists />
    </>
  );
}
