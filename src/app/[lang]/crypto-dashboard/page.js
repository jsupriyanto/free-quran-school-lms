import React from "react";
import Grid from "@mui/material/Grid";
import PageTitle from "@/components/Common/PageTitle";
import Features from "@/components/Dashboard/Crypto/Features";
import MarketGraph from "@/components/Dashboard/Crypto/MarketGraph";
import CurrentRate from "@/components/Dashboard/Crypto/CurrentRate";
import MyProfile from "@/components/Dashboard/Crypto/MyProfile";
import UserActivities from "@/components/Dashboard/Crypto/UserActivities";
import OrdersActivities from "@/components/Dashboard/Crypto/OrdersActivities";
import MyCurrencies from "@/components/Dashboard/Crypto/MyCurrencies";
import Trading from "@/components/Dashboard/Crypto/Trading";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Crypto"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 9 }}>
          {/* Features */}
          <Features />

          {/* MarketGraph */}
          <MarketGraph />

          {/* CurrentRate */}
          <CurrentRate />
        </Grid>

        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 3 }}>
          {/* MyProfile */}
          <MyProfile />

          {/* UserActivities */}
          <UserActivities />
        </Grid>
      </Grid>

      {/* OrdersActivities */}
      <OrdersActivities />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* MyCurrencies */}
          <MyCurrencies />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* Trading */}
          <Trading />
        </Grid>
      </Grid>
    </>
  );
}
