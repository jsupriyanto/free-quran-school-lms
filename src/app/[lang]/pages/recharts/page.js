import React from "react";
import Grid from "@mui/material/Grid";
import NavBar from "@/components/Pages/Charts/NavBar";
import SimpleLineChart from "@/components/Pages/Charts/Recharts/LineChart/SimpleLineChart";
import VerticalLineChart from "@/components/Pages/Charts/Recharts/LineChart/VerticalLineChart";
import SimpleAreaChart from "@/components/Pages/Charts/Recharts/AreaChart/SimpleAreaChart";
import StackedAreaChart from "@/components/Pages/Charts/Recharts/AreaChart/StackedAreaChart";
import TinyBarChart from "@/components/Pages/Charts/Recharts/BarChart/TinyBarChart";
import SimpleBarChart from "@/components/Pages/Charts/Recharts/BarChart/SimpleBarChart";
import LineBarAreaComposedChart from "@/components/Pages/Charts/Recharts/ComposedChart/LineBarAreaComposedChart";
import SameDataComposedChart from "@/components/Pages/Charts/Recharts/ComposedChart/SameDataComposedChart";
import SimpleScatterChart from "@/components/Pages/Charts/Recharts/ScatterChart/SimpleScatterChart";
import ThreeDimScatterChart from "@/components/Pages/Charts/Recharts/ScatterChart/ThreeDimScatterChart";
import TwoLevelPieChart from "@/components/Pages/Charts/Recharts/PieChart/TwoLevelPieChart";
import TwoSimplePieChart from "@/components/Pages/Charts/Recharts/PieChart/TwoSimplePieChart";
import SimpleRadarChart from "@/components/Pages/Charts/Recharts/RadarChart/SimpleRadarChart";
import SpecifiedDomainRadarChart from "@/components/Pages/Charts/Recharts/RadarChart/SpecifiedDomainRadarChart";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Recharts"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      {/* Nav */}
      <NavBar />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SimpleLineChart */}
          <SimpleLineChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* VerticalLineChart */}
          <VerticalLineChart />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SimpleAreaChart */}
          <SimpleAreaChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* StackedAreaChart */}
          <StackedAreaChart />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* TinyBarChart */}
          <TinyBarChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SimpleBarChart */}
          <SimpleBarChart />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* LineBarAreaComposedChart */}
          <LineBarAreaComposedChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SameDataComposedChart */}
          <SameDataComposedChart />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SimpleScatterChart */}
          <SimpleScatterChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* ThreeDimScatterChart */}
          <ThreeDimScatterChart />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* TwoLevelPieChart */}
          <TwoLevelPieChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* TwoSimplePieChart */}
          <TwoSimplePieChart />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SimpleRadarChart */}
          <SimpleRadarChart />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* SpecifiedDomainRadarChart */}
          <SpecifiedDomainRadarChart />
        </Grid>
      </Grid>
    </>
  );
}
