import Grid from "@mui/material/Grid";
import PageTitle from "@/components/Common/PageTitle";
import RevenueReport from "@/components/Dashboard/Analytics/RevenueReport";
import AvarageReport from "@/components/Analytics/Reports/AvarageReport";
import SessionsByCountries from "@/components/Dashboard/Analytics/SessionsByCountries";
import BrowserUsedAndTrafficReports from "@/components/Analytics/Reports/BrowserUsedAndTrafficReports";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Reports"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 5 }}>
          <RevenueReport />
        </Grid>

        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 3 }}>
          <AvarageReport />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          <SessionsByCountries />
        </Grid>
      </Grid>

      <BrowserUsedAndTrafficReports />
    </>
  );
}
