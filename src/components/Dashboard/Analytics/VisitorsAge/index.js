"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import styles from "@/components/Dashboard/Analytics/VisitorsAge/VisitorsAge.module.css";

const VisitorsAge = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([40]);
  const [options] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: "rgba(247, 101, 163, 0.5)",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 4,
            color: "#F765A3",
            fontSize: "16px",
            fontWeight: "500",
          },
        },
      },
    },
    fill: {
      colors: ["#F765A3"],
    },
  });

  return (
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
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "10px",
          mb: "15px",
        }}
        className="for-dark-bottom-border"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Visitors Age
        </Typography>
      </Box>

      <div>
        <div className={styles.infoList}>
          <div>
            <p>Under 30</p>
            <h5>16,868</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 32%
            </p>
          </div>
        </div>

        <div className={styles.infoList}>
          <div>
            <p>Over 30</p>
            <h5>31,868</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 68%
            </p>
          </div>
        </div>
      </div>

      {Chart && (
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={250}
        />
      )}
    </Card>
  );
};

export default VisitorsAge;
