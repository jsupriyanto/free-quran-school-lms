import React from "react";
import Grid from "@mui/material/Grid";
import Features from "@/components/Dashboard/HelpDesk/Features";
import TicketsStatus from "@/components/Dashboard/HelpDesk/TicketsStatus";
import CustomerSatisfaction from "@/components/Dashboard/HelpDesk/CustomerSatisfaction";
import SupportStatus from "@/components/Dashboard/HelpDesk/SupportStatus";
import AverageSpeedOfAnswer from "@/components/Dashboard/HelpDesk/AverageSpeedOfAnswer";
import AgentPerformance from "@/components/Dashboard/HelpDesk/AgentPerformance";
import TimeToResolveComplaint from "@/components/Dashboard/HelpDesk/TimeToResolveComplaint";
import Activity from "@/components/Dashboard/HelpDesk/Activity";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Help/Support Desk"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      {/* Features */}
      <Features />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* TicketsStatus */}
          <TicketsStatus />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* CustomerSatisfaction */}
          <CustomerSatisfaction />
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              {/* AverageSpeedOfAnswer */}
              <AverageSpeedOfAnswer />

              {/* TimeToResolveComplaint */}
              <TimeToResolveComplaint />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              {/* SupportStatus */}
              <SupportStatus />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* Activity */}
          <Activity />
        </Grid>
      </Grid>

      {/* AgentPerformance */}
      <AgentPerformance />
    </>
  );
}
