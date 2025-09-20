"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import styles from "@/components/Dashboard/Analytics/Gender/Gender.module.css";

const Gender = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([50]);
  const [options] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: "rgba(0, 182, 155, 0.5)",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 4,
            color: "#00B69B",
            fontSize: "16px",
            fontWeight: "500",
          },
        },
      },
    },
    fill: {
      colors: ["#00B69B"],
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
          Gender
        </Typography>
      </Box>

      <div>
        <div className={styles.infoList}>
          <div>
            <p>Male</p>
            <h5>45,347</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 70%
            </p>
          </div>
        </div>

        <div className={styles.infoList}>
          <div>
            <p>Female</p>
            <h5>20,738</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 30%
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

export default Gender;
