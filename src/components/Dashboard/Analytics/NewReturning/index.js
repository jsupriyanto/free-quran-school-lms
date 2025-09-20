"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import styles from "@/components/Dashboard/Analytics/NewReturning/NewReturning.module.css";

const NewReturning = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([60]);
  const [options] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: "rgba(117, 127, 239, 0.5)",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 4,
            color: "#757FEF",
            fontSize: "16px",
            fontWeight: "500",
          },
        },
      },
    },
    fill: {
      colors: ["#757FEF"],
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
          New vs. Returning
        </Typography>
      </Box>

      <div>
        <div className={styles.infoList}>
          <div>
            <p>New</p>
            <h5>36,868</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 75%
            </p>
          </div>
        </div>

        <div className={styles.infoList}>
          <div>
            <p>Returning</p>
            <h5>9,217</h5>
          </div>
          <div className={styles.rightContent}>
            <p>
              <i className="ri-bar-chart-fill"></i> 25%
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

export default NewReturning;
