"use client";

import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const AverageSpeedOfAnswer = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "30px",
          }}
        >
          <Typography as="h5" fontSize="16px" fontWeight="500">
            Average Speed of Answer
          </Typography>

          <Typography as="h3" fontSize="28px" fontWeight="700" color="#5B5B98">
            01<span style={{ fontSize: "12px" }}>m</span> : 20
            <span style={{ fontSize: "12px" }}>s</span>
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Image
            src="/images/chart3.png"
            alt="chart"
            width={460}
            height={108}
          />
        </Box>
      </Card>
    </>
  );
};

export default AverageSpeedOfAnswer;
