"use client";

import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import courseService from "@/services/course.service";
import userService from "@/services/user.service";
import enrollmentService from "@/services/enrollment.service";
import { LinearProgress } from "@mui/material";

const Features = () => {

  let enrolledCourses = {
    id: "1",
    title: "",
    subTitle: "Enrolled Courses",
    image: "/assets/img/icon1.png",
  }

  let completedEnrollments = {
    id: "2",
    title: "",
    subTitle: "Completed Enrollments",
    image: "/assets/img/icon3.png",
  }

  let activeCourses = {
    id: "3",
    title: "",
    subTitle: "Active Courses",
    image: "/assets/img/icon2.png",
  };
  
  let totalStudents = {
    id: "4",
    title: "",
    subTitle: "Total Students",
    image: "/assets/img/icon4.png",
  };

  
  let [enrolledCourse, setEnrolledCourses] = React.useState(enrolledCourses);
  let [completedEnrollment, setCompletedEnrollments] = React.useState(completedEnrollments);
  let [activeCourse, setActiveCourses] = React.useState(activeCourses);
  let [totalStudent, setTotalStudents] = React.useState(totalStudents);

  let FeaturesData = [
    enrolledCourse,
    activeCourse,
    totalStudent,
    completedEnrollment,
  ];

  const refreshData = () => {
    courseService.getCourseStats().then((response) => {
      activeCourses.title = response.data.publishedCourses;
      setActiveCourses({ ...activeCourses });
    });

    userService.getUserCount().then((response) => {
      totalStudents.title = response.data.count;
      setTotalStudents({ ...totalStudents });
    });
    enrollmentService.getEnrollmentStats().then((response) => {
      enrolledCourses.title = response.data.totalEnrollments;
      completedEnrollments.title = response.data.completedEnrollments;
      setEnrolledCourses({ ...enrolledCourses });
      setCompletedEnrollments({ ...completedEnrollments });
    });
  }
  useEffect(() => {
    refreshData();
  }, []);


  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData.map((feature) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }} key={feature.id}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "25px",
                mb: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "100%",
                  }}
                  className="mr-15px"
                >
                  <Image
                    src={feature.image}
                    alt="Icon"
                    width={84}
                    height={84}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: 28, fontWeight: 700, mb: "5px" }}
                  >
                    {feature.title !== '' ? 
                    feature.title : 
                    <LinearProgress value={null} />
                    }
                  </Typography>

                  <Typography variant="p" sx={{ fontSize: 14 }}>
                    {feature.subTitle}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
