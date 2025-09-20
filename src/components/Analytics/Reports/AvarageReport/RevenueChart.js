"use client";

import React, { useEffect, useState } from "react";

const RevenueChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series, setSeries] = useState([65]);
  const [options, setOptions] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: "#ECEFF7",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '12px',
            color: '#5B5B98',
          },
          value: {
            offsetY: 3,
            color: "#00B69B",
            fontSize: "16px",
            fontWeight: "500",
          },
        },
      },
    },
    labels: ['Revenue'],
    fill: {
      opacity: 1,
      colors: ["#757FEF"],
    },
  });

  return (
    <>
      {Chart && (
        <Chart
          options={options}
          series={series}
          height={150}
          type="radialBar"
        />
      )}
    </>
  );
};

export default RevenueChart;
