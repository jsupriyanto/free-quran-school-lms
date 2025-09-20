"use client";

import React from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RatingsChart from "./RatingsChart";

const Ratings = () => {
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontSize: 18, fontWeight: 500, mb: "10px" }}
              >
                Ratings
              </Typography>

              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#A9A9C8",
                  mb: "10px",
                }}
              >
                YEAR OF 2022
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#260944",
                  mb: "5px",
                }}
                as="h3"
              >
                8.14k{" "}
                <Typography
                  component="span"
                  sx={{ fontSize: 13, color: "#A9A9C8" }}
                >
                  Review
                </Typography>
              </Typography>

              <Typography
                sx={{ fontSize: "12px", fontWeight: 500, color: "#5B5B98" }}
              >
                <StarBorderIcon
                  sx={{ position: "relative", top: "6px", color: "#FA7E00" }}
                />{" "}
                4.5{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: 500, fontSize: "13px", ml: "2px" }}
                  className="primaryColor"
                >
                  +15.6%
                </Typography>{" "}
                From previous period
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <RatingsChart />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Ratings;
