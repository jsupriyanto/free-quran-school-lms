"use client";

import React, { useEffect, useState } from "react";

const SalesByCountriesChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([75, 40, 65, 80]);
  const [options] = useState({
    labels: ["Canada", "Russia", "Greenland", "USA"],
    colors: ["#757FEF", "#2DB6F5", "#EE368C", "#00B69B"],
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
        <Chart options={options} series={series} height="300" type="pie" />
      )}
    </>
  );
};

export default SalesByCountriesChart;
