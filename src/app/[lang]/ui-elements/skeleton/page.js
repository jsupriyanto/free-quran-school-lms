import React from "react";
import Grid from "@mui/material/Grid";
import Variants from "@/components/UIElements/Skeleton/Variants";
import Animations from "@/components/UIElements/Skeleton/Animations";
import PulsateExample from "@/components/UIElements/Skeleton/PulsateExample";
import WaveExample from "@/components/UIElements/Skeleton/WaveExample";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Skeleton"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* Variants */}
          <Variants />

          {/* Animations */}
          <Animations />

          {/* WaveExample */}
          <WaveExample />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* PulsateExample */}
          <PulsateExample />
        </Grid>
      </Grid>
    </>
  );
}
