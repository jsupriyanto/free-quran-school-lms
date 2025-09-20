import React from "react";
import Grid from "@mui/material/Grid";
import PageTitle from "@/components/Common/PageTitle";
import LeftSidebar from "@/components/Email/LeftSidebar";
import ReadEmailContent from "@/components/Email/ReadEmailContent";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Read Email"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          {/* LeftSidebar */}
          <LeftSidebar />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          {/* ReadEmailContent */}
          <ReadEmailContent />
        </Grid>
      </Grid>
    </>
  );
}
