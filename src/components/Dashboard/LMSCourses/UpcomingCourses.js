"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import courseService from "@/services/course.service";

const UpcomingCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    courseService.getUpcomingCourses().then((response) => {
      setCourses(response.data);
    }).catch((err) => {
      // Handle error silently
    });
  };

  return (
    <>
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
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Upcoming Courses
          </Typography>
        </Box>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          {Array.isArray(courses) && courses?.map((course) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }} key={course.id}>
              <Box
                sx={{
                  background: "#F7F7FC",
                  borderRadius: "10px",
                  padding: "25px 20px",
                }}
                className="dark-BG-101010"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography as="h3" fontSize="18px" fontWeight="700">
                      {course.title}
                    </Typography>
                    <Typography
                      textTransform="uppercase"
                      color="primary"
                      fontSize="12px"
                      mt="5px"
                    >
                      {course.courseCategory}
                    </Typography>
                  </Box>
                  <Image src={course.coursePictureUrl} alt="img" width={53} height={53} />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "25px",
                  }}
                >
                  <Typography fontSize="13px" fontWeight="500">
                    {course.numberOfLessons} Lessons
                  </Typography>

                  <Typography fontSize="13px" color="#A9A9C8">
                    {course.duration}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default UpcomingCourses;
