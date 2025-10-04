"use client";
import Grid from "@mui/material/Grid";
import Features from "@/components/Dashboard/LMSCourses/Features";
import YourProgress from "@/components/Dashboard/LMSCourses/YourProgress";
import TopInstructor from "@/components/Dashboard/LMSCourses/TopInstructor";
import CurrentCourses from "@/components/Dashboard/LMSCourses/CurrentCourses";
import Courses from "@/components/Dashboard/LMSCourses/Courses";
import TopStudents from "@/components/Dashboard/LMSCourses/TopStudents";
import PageTitle from "@/components/Common/PageTitle";
import { SessionProvider, getSession } from "next-auth/react";

const session = await getSession();

export default function Page({ lang }) {
  const currentLanguage = lang || 'en';
  return (
    <>
      <SessionProvider session={session}>
        <PageTitle
          pageTitle="Learning Management Dashboard"
          dashboardUrl={`/${currentLanguage}/`}
          dashboardText="Dashboard"
        />

        <Features />

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
            <YourProgress />

            <Courses />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
            <TopInstructor />

            <TopStudents />

            <CurrentCourses />
          </Grid>
        </Grid>
      </SessionProvider>
    </>
  );
}
