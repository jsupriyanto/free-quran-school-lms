import React from "react";
import Grid from "@mui/material/Grid";
import ShoppingCart from "@/components/eCommerce/Checkout/ShoppingCart";
import BillingInformation from "@/components/eCommerce/Checkout/BillingInformation";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Checkout"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          {/* ShoppingCart */}
          <ShoppingCart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
          {/* BillingInformation */}
          <BillingInformation />
        </Grid>
      </Grid>
    </>
  );
}
