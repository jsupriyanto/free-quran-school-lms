"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const MilestonesOverviewChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([44, 55, 13]);
  const [options] = useState({
    labels: ["Target", "Last week", "Last Month"],
    stroke: {
      width: 0,
      show: true,
    },
    colors: ["#757FEF", "#90C6E0", "#E040FB"],
    legend: {
      offsetY: 0,
      show: false,
      position: "bottom",
      fontSize: "14px",
      labels: {
        colors: "#5B5B98",
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "14px",
      },
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + "k";
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 280,
          },
        },
      },
    ],
  });

  return (
    <>
      {Chart && (
        <Chart options={options} series={series} type="pie" height={265} />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          mt: "30px",
        }}
      >
        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Target
          </Typography>
          <Typography fontWeight="500" fontSize="18px" as="h4">
            <ArrowDownwardIcon
              color="error"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            18k
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
            5.21k
          </Typography>
        </Box>

        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Last Month
          </Typography>
          <Typography fontWeight="500" fontSize="18px" as="h4">
            <ArrowDownwardIcon
              color="error"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            32k
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MilestonesOverviewChart;
