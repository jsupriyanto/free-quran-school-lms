"use client";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

const BasicRadarCharts = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
    },
  ]);
  const [options] = useState({
    chart: {
      height: 350,
      type: "radar",
    },
    title: {
      text: "Basic Radar Chart",
    },
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
    },
  });

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
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "5px",
            mb: "15px",
          }}
          className="for-dark-bottom-border"
        >
          Basic Radar Charts
        </Typography>

        {Chart && (
          <Chart options={options} series={series} type="radar" height={350} />
        )}
      </Card>
    </>
  );
};

export default BasicRadarCharts;
