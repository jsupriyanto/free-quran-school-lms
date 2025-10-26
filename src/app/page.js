"use client";

import Grid from "@mui/material/Grid";
import Features from "@/components/Dashboard/LMSCourses/Features";
import YourProgress from "@/components/Dashboard/LMSCourses/YourProgress";
import TopInstructor from "@/components/Dashboard/LMSCourses/TopInstructor";
import TopStudents from "@/components/Dashboard/LMSCourses/TopStudents";
import UpcomingCourses from "@/components/Dashboard/LMSCourses/UpcomingCourses";
import UpcomingCourseCompletions from "@/components/Dashboard/LMSCourses/UpcomingCourseCompletions";
import Courses from "@/components/Dashboard/LMSCourses/Courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/Common/PageTitle";
import authService from "@/services/auth.service";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status after component mounts
    const checkAuthStatus = () => {
      const isThirdPartySignInProgress = authService.getThirdPartySignInProgress();
      const currentUser = authService.getCurrentUser();
      
      if (isThirdPartySignInProgress && !currentUser) {
        router.push("/authentication/sign-in");
        return;
      }
      
      // Wait 3 seconds before showing dashboard if third-party sign-in was in progress
      if (isThirdPartySignInProgress) {
        setTimeout(() => {
          const stillInProgress = authService.getThirdPartySignInProgress();
          const updatedUser = authService.getCurrentUser();
          
          if (!stillInProgress || updatedUser) {
            setIsLoading(false);
          } else {
            router.push("/authentication/sign-in");
          }
        }, 3000);
      } else {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '16px'
      }}>
        Loading...
      </div>
    );
  }


  return (
    <>
      <PageTitle
        pageTitle="Learning Management Dashboard"
        dashboardUrl="/"
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

          <UpcomingCourseCompletions />

          <UpcomingCourses />
        </Grid>
      </Grid>
    </>
  );
}
