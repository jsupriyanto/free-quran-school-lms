"use client";

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Image from "next/image";
import teacherService from "@/services/teacher.service";

const TopInstructor = () => {
  const [instructorData, setInstructorData] = React.useState([]);
  // Select Form
  const [select, setSelect] = React.useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    fetchTopInstructors();
  }, []);

  const fetchTopInstructors = () => {
    teacherService.getTop5Teachers().then((res) => {
      setInstructorData(res.data);
    }).catch(err => {
      console.log(err);
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            marginBottom: "10px",
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
            Top Teachers
          </Typography>
        </Box>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          {instructorData.map((instructor) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} key={instructor.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#F7F7FC",
                  borderRadius: "10px",
                  p: "18px 15px",
                  mt: "5px",
                }}
                className="dark-BG-101010"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={instructor.photoUrl || `/images/user${instructor.id}.png`}
                    alt="Image"
                    width={45}
                    height={45}
                    className="borderRadius10"
                  />

                  <Box className="ml-1">
                    <Typography as="h4" fontWeight={500} fontSize="13px">
                      {instructor.firstName} {instructor.lastName}
                    </Typography>
                    <Typography color="#A9A9C8;" fontSize="12px">
                      {instructor.twitterUrl && (
                        <a href={instructor.twitterUrl} target="_blank" rel="noopener noreferrer">
                          {instructor.twitterUrl}
                        </a>
                      )}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Button
                    sx={{
                      background: "#fff",
                      color: "#A9A9C8",
                      width: "30px",
                      height: "30px",
                      p: "0",
                      minWidth: "auto",
                      fontSize: "17px",
                      borderRadius: "100%",
                    }}
                  >
                    <i className="ri-add-line"></i>
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default TopInstructor;
