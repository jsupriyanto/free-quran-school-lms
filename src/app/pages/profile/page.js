import React from "react";
import Grid from "@mui/material/Grid";
import Features from "@/components/Pages/Profile/Features";
import PersonalInformation from "@/components/Pages/Profile/PersonalInformation";
import ActivityTimeline from "@/components/Pages/Profile/ActivityTimeline";
import Overview from "@/components/Pages/Profile/Overview";
import MyTasks from "@/components/Pages/Profile/MyTasks";
import ProfileContent from "@/components/Pages/Profile/ProfileContent";
import ImpressionGoalConversions from "@/components/Dashboard/Analytics/ImpressionGoalConversions";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Profile"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* ProfileContent */}
          <ProfileContent />

          {/* ImpressionGoalConversions */}
          <ImpressionGoalConversions />

          {/* Personal Information */}
          <PersonalInformation />

          {/* ActivityTimeline */}
          <ActivityTimeline />
        </Grid>

        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* Features */}
          <Features />

          {/* Overview */}
          <Overview />

          {/* MyTasks */}
          <MyTasks />
        </Grid>
      </Grid>
    </>
  );
}
