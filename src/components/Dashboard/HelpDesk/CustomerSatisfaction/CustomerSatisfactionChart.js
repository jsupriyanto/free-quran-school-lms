"use client";

import React, { useEffect, useState } from "react";


const CustomerSatisfactionChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([80, 75, 70, 60]);
  const [options] = useState({
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            offsetY: -2,
            show: true,
          },
          value: {
            show: true,
            offsetY: 3,
            fontWeight: "600",
          },
          total: {
            show: true,
            label: "Overall",
          },
        },
        hollow: {
          size: "45%",
        },
      },
    },
    colors: ["#757FEF", "#2DB6F5", "#8BD3F4", "#BFE9FF"],
    labels: ["Excellent", "Very Good", "Good", "Unhappy"],
    legend: {
      show: false,
    },
  });

  return (
    <>
      {Chart && (
        <Chart
          options={options}
          series={series}
          height={262}
          type="radialBar"
        />
      )}
    </>
  );
};

export default CustomerSatisfactionChart;
