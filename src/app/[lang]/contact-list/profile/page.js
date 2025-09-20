import React from "react";
import Grid from "@mui/material/Grid";
import ProfileInfo from "@/components/ContactList/ProfileInfo";
import Features from "@/components/ContactList/Features";
import PersonalInformation from "@/components/ContactList/PersonalInformation";
import ActivityTimeline from "@/components/ContactList/ActivityTimeline";
import Overview from "@/components/ContactList/Overview";
import MyTasks from "@/components/ContactList/MyTasks";
import ImpressionGoalConversions from "@/components/Dashboard/Analytics/ImpressionGoalConversions";
import PageTitle from "@/components/Common/PageTitle";

export default function Page({ params: { lang } }) {
  return (
    <>
      <PageTitle
        pageTitle="Profile"
        dashboardUrl={`/${lang}/`}
        dashboardText="Dashboard"
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* ProfileInfo */}
          <ProfileInfo />

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
