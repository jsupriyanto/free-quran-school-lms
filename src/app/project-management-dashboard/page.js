import React from "react";
import Grid from "@mui/material/Grid";
import Features from "@/components/Dashboard/ProjectManagement/Features";
import TaskDistribution from "@/components/Dashboard/ProjectManagement/TaskDistribution";
import MyTasks from "@/components/Dashboard/ProjectManagement/MyTasks";
import TotalUsers from "@/components/Dashboard/ProjectManagement/TotalUsers";
import CompletedTasks from "@/components/Dashboard/ProjectManagement/CompletedTasks";
import TasksPerformance from "@/components/Dashboard/ProjectManagement/TasksPerformance";
import IssuesSummary from "@/components/Dashboard/ProjectManagement/IssuesSummary";
import AllProjects from "@/components/Dashboard/ProjectManagement/AllProjects";
import TeamMembers from "@/components/Dashboard/ProjectManagement/TeamMembers";
import ActivityTimeline from "@/components/Dashboard/ProjectManagement/ActivityTimeline";
import PageTitle from "@/components/Common/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle
        pageTitle="Project Management"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      {/* Features */}
      <Features />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* TaskDistribution */}
          <TaskDistribution />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          {/* MyTasks */}
          <MyTasks />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* TotalUsers */}
          <TotalUsers />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* CompletedTasks */}
          <CompletedTasks />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* TasksPerformance */}
          <TasksPerformance />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* IssuesSummary */}
          <IssuesSummary />

          {/* AllProjects */}
          <AllProjects />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* TeamMembers */}
          <TeamMembers />

          {/* ActivityTimeline */}
          <ActivityTimeline />
        </Grid>
      </Grid>
    </>
  );
}
