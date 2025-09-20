"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import styles from "@/components/Dashboard/Analytics/SessionsDevice/SessionsDevice.module.css";

const SessionsDevice = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([70]);
  const [options] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: "rgba(255, 138, 84, 0.5)",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 4,
            color: "#FF8A54",
            fontSize: "16px",
            fontWeight: "500",
          },
        },
      },
    },
    fill: {
      colors: ["#FF8A54"],
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
          Sessions Device
        </Typography>
      </Box>

      <div>
        <div className={styles.infoList}>
          <div>
            <p>Mobile</p>
            <h5>15,684</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 50%
            </p>
          </div>
        </div>

        <div className={styles.infoList}>
          <div>
            <p>Laptop</p>
            <h5>36,868</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 60%
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

export default SessionsDevice;
