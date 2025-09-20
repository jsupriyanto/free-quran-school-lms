"use client";

import React, { useEffect, useState } from "react";

const ActiveCourseChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([72, 56, 50]);
  const [options] = useState({
    chart: {
      type: "donut",
    },
    legend: {
      offsetY: 2,
      position: "bottom",
      horizontalAlign: "center",
    },
    labels: ["Courses Done", "On Progress", "To Do"],
    colors: ["#757FEF", "#EE368C", "#00B69B"],
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + "%";
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  return (
    <>
      {Chart && (
        <Chart options={options} series={series} height={320} type="donut" />
      )}
    </>
  );
};

export default ActiveCourseChart;
