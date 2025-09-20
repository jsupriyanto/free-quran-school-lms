"use client";

import React, { useEffect, useState } from "react";


const LiveVisitsChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([72, 56]);
  const [options] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Domestic", "International"],
    colors: ["#757FEF", "#EE368C"],
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + "%";
        },
      },
    },
    legend: {
      offsetY: 2,
      position: "bottom",
      horizontalAlign: "center",
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
        <Chart options={options} series={series} height={280} type="donut" />
      )}
    </>
  );
};

export default LiveVisitsChart;
