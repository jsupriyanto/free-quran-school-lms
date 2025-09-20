"use client";

import React, { useEffect, useState } from "react";
import styles from "../../Crypto/MyProfile/MyProfile.module.css";

const MyProfileChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([1000, 800, 1500, 761, 871]);
  const [options] = useState({
    colors: ["#757fef", "#2db6f5", "#00b69b", "#f7931a", "#f4f4f4"],
    chart: {
      type: "donut",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$" + val;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "88%",
        },
      },
    },
    stroke: {
      width: 0,
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      offsetY: 0,
      show: false,
      fontSize: "14px",
      position: "bottom",
      horizontalAlign: "center",
    },
    labels: ["Bitcoin", "Ethereum", "Comp Bidr", "Matic", "Litecoin"],
  });

  return (
    <>
      <div className={styles.myProfileChart}>
        {Chart && (
          <Chart options={options} series={series} type="donut" height={215} />
        )}

        <div className={styles.content}>
          <h5>$1025465</h5>
          <p>Total Value</p>
        </div>
      </div>
    </>
  );
};

export default MyProfileChart;
