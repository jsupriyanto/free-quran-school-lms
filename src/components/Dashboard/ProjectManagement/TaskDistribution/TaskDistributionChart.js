"use client";

import React, { useEffect, useState } from "react";

const TaskDistributionChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([14, 23, 21, 17]);
  const [options] = useState({
    labels: ["API", "Frontend", "Backend", "Design"],
    colors: ["#B8C8DB", "#A1AADB", "#BA68C8", "#8E72C8"],
    fill: {
      opacity: 0.9,
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
        <Chart
          options={options}
          series={series}
          height="410"
          type="polarArea"
        />
      )}
    </>
  );
};

export default TaskDistributionChart;
