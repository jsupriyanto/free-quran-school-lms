import React from "react";
import Grid from "@mui/material/Grid";
import Profile from "@/components/Dashboard/SaasApp/Profile";
import IncomeStatus from "@/components/Dashboard/SaasApp/IncomeStatus";
import TotalOrders from "@/components/Dashboard/SaasApp/TotalOrders";
import Features from "@/components/Dashboard/SaasApp/Features";
import RevenueSummary from "@/components/Dashboard/SaasApp/RevenueSummary";
import SalesAnalytics from "@/components/Dashboard/SaasApp/SalesAnalytics";
import AudienceOverview from "@/components/Dashboard/SaasApp/AudienceOverview";
import AllProjects from "@/components/Dashboard/SaasApp/AllProjects";
import Messages from "@/components/Dashboard/SaasApp/Messages";
import CompletedTasks from "@/components/Dashboard/SaasApp/CompletedTasks";
import TasksPerformance from "@/components/Dashboard/SaasApp/TasksPerformance";
import MilestonesOverview from "@/components/Dashboard/SaasApp/MilestonesOverview";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="SaaS App"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
          {/* Profile */}
          <Profile />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
          {/* IncomeStatus */}
          <IncomeStatus />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
          {/* TotalOrders */}
          <TotalOrders />
        </Grid>
      </Grid>

      {/* Features */}
      <Features />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* RevenueSummary */}
          <RevenueSummary />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SalesAnalytics */}
          <SalesAnalytics />
        </Grid>
      </Grid>

      {/* AudienceOverview */}
      <AudienceOverview />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* AllProjects */}
          <AllProjects />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* Messages */}
          <Messages />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
          {/* MilestonesOverview */}
          <MilestonesOverview />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
          {/* TasksPerformance */}
          <CompletedTasks />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
          {/* TasksPerformance */}
          <TasksPerformance />
        </Grid>
      </Grid>
    </>
  );
}
