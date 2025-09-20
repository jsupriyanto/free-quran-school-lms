import React from "react";
import Grid from "@mui/material/Grid";
import BasicTabs from "@/components/UIElements/Tabs/BasicTabs";
import ExperimentalAPI from "@/components/UIElements/Tabs/ExperimentalAPI";
import VerticalTabs from "@/components/UIElements/Tabs/VerticalTabs";
import IconTabs from "@/components/UIElements/Tabs/IconTabs";
import IconPosition from "@/components/UIElements/Tabs/IconPosition";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle pageTitle="Tabs" dashboardUrl={`/${lang}/`} dashboardText="Dashboard" />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* BasicTabs */}
          <BasicTabs />

          {/* FixedTabs */}
          <VerticalTabs />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* ExperimentalAPI */}
          <ExperimentalAPI />

          {/* IconTabs */}
          <IconTabs />

          {/* IconPosition */}
          <IconPosition />
        </Grid>
      </Grid>
    </>
  );
}
