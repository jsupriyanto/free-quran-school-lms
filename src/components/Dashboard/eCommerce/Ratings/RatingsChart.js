"use client";

import React, { useEffect, useState } from "react";

const RatingsChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([44, 55, 41, 17, 15]);
  const [options] = useState({
    chart: {
      width: 300,
    },
    colors: ["#757FEF", "#00B69B", "#2DB6F5", "#EE368C", "#FFBC2B"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      show: false,
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
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
        <Chart options={options} series={series} height={120} type="donut" />
      )}
    </>
  );
};

export default RatingsChart;
