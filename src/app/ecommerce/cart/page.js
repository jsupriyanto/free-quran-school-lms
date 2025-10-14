import React from "react";
import Grid from "@mui/material/Grid";
import ShoppingCart from "@/components/eCommerce/Cart/ShoppingCart";
import OrderSummary from "@/components/eCommerce/Cart/OrderSummary";
import HaveAPromoCode from "@/components/eCommerce/Cart/HaveAPromoCode";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle pageTitle="Cart" dashboardUrl={`/`} dashboardText="Dashboard" />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* ShoppingCart */}
          <ShoppingCart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* OrderSummary */}
          <OrderSummary />

          {/* HaveAPromoCode */}
          <HaveAPromoCode />
        </Grid>
      </Grid>
    </>
  );
}
