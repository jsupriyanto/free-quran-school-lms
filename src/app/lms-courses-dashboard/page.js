"use client";

import Grid from "@mui/material/Grid";
import Features from "@/components/Dashboard/LMSCourses/Features";
import YourProgress from "@/components/Dashboard/LMSCourses/YourProgress";
import ExperienceIQ from "@/components/Dashboard/LMSCourses/ExperienceIQ";
import HoursSpent from "@/components/Dashboard/LMSCourses/HoursSpent";
import MyPlanning from "@/components/Dashboard/LMSCourses/MyPlanning";
import TopInstructor from "@/components/Dashboard/LMSCourses/TopInstructor";
import TotalWatched from "@/components/Dashboard/LMSCourses/TotalWatched";
import CurrentCourses from "@/components/Dashboard/LMSCourses/UpcomingCourses";
import Courses from "@/components/Dashboard/LMSCourses/Courses";
import ActiveCourse from "@/components/Dashboard/LMSCourses/ActiveCourse";
import CourseCompletion from "@/components/Dashboard/LMSCourses/CourseCompletion";
import Messages from "@/components/Dashboard/LMSCourses/Messages";
import TopStudents from "@/components/Dashboard/LMSCourses/TopStudents";
import PageTitle from "@/components/Common/PageTitle";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/authentication/sign-in');
      return;
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <>
      <PageTitle
        pageTitle="Learning Management System"
        dashboardUrl={`/`}
        dashboardText="Dashboard"
      />

      {/* Features */}
      <Features />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          {/* YourProgress */}
          <YourProgress />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
              {/* HoursSpent */}
              <HoursSpent />

              {/* TopInstructor */}
              <TopInstructor />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
              {/* MyPlanning */}
              <MyPlanning />

              {/* TotalWatched */}
              <TotalWatched />
            </Grid>
          </Grid>

          {/* CurrentCourse */}
          <CurrentCourses />

          {/* Courses */}
          <Courses />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          {/* ExperienceIQ */}
          <ExperienceIQ />

          {/* ActiveCourse */}
          <ActiveCourse />

          {/* CourseCompletion */}
          <CourseCompletion />

          {/* Messages */}
          <Messages />

          {/* TopStudents */}
          <TopStudents />
        </Grid>
      </Grid>
    </>
  );
}
