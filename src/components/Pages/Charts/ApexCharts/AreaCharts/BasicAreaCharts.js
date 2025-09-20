"use client";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
 
const seriesData = {
  monthDataSeries1: {
    prices: [
      8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85,
      8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25,
      8500.65, 8881.1, 9340.85,
    ],
    dates: [
      "13 Nov 2018",
      "14 Nov 2018",
      "15 Nov 2018",
      "16 Nov 2018",
      "17 Nov 2018",
      "20 Nov 2018",
      "21 Nov 2018",
      "22 Nov 2018",
      "23 Nov 2018",
      "24 Nov 2018",
      "27 Nov 2018",
      "28 Nov 2018",
      "29 Nov 2018",
      "30 Nov 2018",
      "01 Dec 2018",
      "04 Dec 2018",
      "05 Dec 2018",
      "06 Dec 2018",
      "07 Dec 2018",
      "08 Dec 2018",
    ],
  },
};

const BasicAreaCharts = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series, setSeries] = useState([
    {
      name: "STOCK ABC",
      data: seriesData.monthDataSeries1.prices,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Fundamental Analysis of Stocks",
      align: "left",
    },
    subtitle: {
      text: "Price Movements",
      align: "left",
    },
    labels: seriesData.monthDataSeries1.dates,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  });

  return (
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
        Basic
      </Typography>

      {Chart && (
        <Chart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      )}
    </Card>
  );
};

export default BasicAreaCharts;
