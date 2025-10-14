import Grid from "@mui/material/Grid";
import Features from "@/components/Dashboard/Analytics/Features";
import Welcome from "@/components/Dashboard/Analytics/Welcome";
import AudienceOverview from "@/components/Dashboard/Analytics/AudienceOverview";
import VisitsByDayAndNetIncome from "@/components/Dashboard/Analytics/VisitsByDayAndNetIncome";
import SalesAnalytics from "@/components/Dashboard/Analytics/SalesAnalytics";
import TotalRevenue from "@/components/Dashboard/Analytics/TotalRevenue";
import ActivityTimeline from "@/components/Dashboard/Analytics/ActivityTimeline";
import RevenueReport from "@/components/Dashboard/Analytics/RevenueReport";
import SessionsByCountries from "@/components/Dashboard/Analytics/SessionsByCountries";
import TotalTransactions from "@/components/Dashboard/Analytics/TotalTransactions";
import BrowserUsedTrafficReports from "@/components/Dashboard/Analytics/BrowserUsedTrafficReports";
import Terminals from "@/components/Dashboard/Analytics/Terminals";
import NewReturning from "@/components/Dashboard/Analytics/NewReturning";
import Gender from "@/components/Dashboard/Analytics/Gender";
import VisitorsAge from "@/components/Dashboard/Analytics/VisitorsAge";
import SessionsDevice from "@/components/Dashboard/Analytics/SessionsDevice";
import ImpressionGoalConversions from "@/components/Dashboard/Analytics/ImpressionGoalConversions";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Analytics"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* Welcome */}
          <Welcome />

          {/* ImpressionGoalConversions */}
          <ImpressionGoalConversions />

          {/* VisitsByDayAndNetIncome */}
          <VisitsByDayAndNetIncome />
        </Grid>

        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* Features */}
          <Features />

          {/* AudienceOverview */}
          <AudienceOverview />
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              {/* SalesAnalytics */}
              <SalesAnalytics />

              {/* RevenueRepor */}
              <RevenueReport />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              {/* TotalRevenue */}
              <TotalRevenue />

              {/* ActivityTimelin */}
              <ActivityTimeline />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* SessionsByCountries */}
          <SessionsByCountries />

          {/* TotalTransactions */}
          <TotalTransactions />
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* BrowserUsedTrafficReports */}
          <BrowserUsedTrafficReports />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* Terminals */}
          <Terminals />
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 3 }}>
          {/* SessionsDevice */}
          <SessionsDevice />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 3 }}>
          {/* NewReturning */}
          <NewReturning />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 3 }}>
          {/* Gender */}
          <Gender />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 3 }}>
          {/* VisitorsAge */}
          <VisitorsAge />
        </Grid>
      </Grid>
    </>
  );
}
