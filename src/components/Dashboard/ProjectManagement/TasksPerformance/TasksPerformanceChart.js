"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const TasksPerformanceChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([76, 67, 61, 90]);
  const [options] = useState({
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "25%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD"],
    labels: ["Completed", "Active", "Assigned", "Pending"],
    legend: {
      show: true,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetY: 0,
      labels: {
        color: "#5B5B98",
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 280,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    fill: {
      opacity: 1,
    },
  });

  return (
    <>
      {Chart && (
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={275}
        />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          mt: "22px",
        }}
      >
        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Target
          </Typography>
          <Typography fontWeight="500" fontSize="18px" as="h4">
            <ArrowDownwardIcon
              color="danger"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            30k
          </Typography>
        </Box>

        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Last Week
          </Typography>
          <Typography fontWeight="500" fontSize="18px" as="h4">
            <ArrowUpwardIcon
              color="success"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            40k
          </Typography>
        </Box>

        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Last Month
          </Typography>
          <Typography fontWeight="500" fontSize="18px" as="h4">
            <ArrowUpwardIcon
              color="success"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            60k
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TasksPerformanceChart;
