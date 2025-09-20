import React from "react";
import ProductDetailsContent from "@/components/eCommerce/ProductDetails/ProductDetailsContent";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Product Details"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <ProductDetailsContent />
    </>
  );
}
