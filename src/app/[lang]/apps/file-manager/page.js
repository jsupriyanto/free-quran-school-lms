import React from "react";
import PageTitle from "@/components/Common/PageTitle";
import Grid from "@mui/material/Grid";
import LeftSidebar from "@/components/Apps/FileManager/LeftSidebar";
import MyDrive from "@/components/Apps/FileManager/MyDrive";
import RecentFiles from "@/components/Apps/FileManager/RecentFiles";
import Files from "@/components/Apps/FileManager/Files";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="File Manager"
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
          {/* MyDrive */}
          <MyDrive />

          {/* RecentFiles */}
          <RecentFiles />

          {/* Files */}
          <Files />
        </Grid>
      </Grid>
    </>
  );
}
