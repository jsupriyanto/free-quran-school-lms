"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";

const CourseCompletionList = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const [series] = useState([25]);
  const [series2] = useState([50]);
  const [series3] = useState([30]);
  const [series4] = useState([55]);
  const [options] = useState({
    chart: {
      offsetX: -8,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: "#A9C8FB",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 3,
            color: "#757FEF",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
      },
    },
    fill: {
      colors: ["#757FEF"],
      opacity: 1,
    },
  });

  return (
    <>
      {/* Course completion 1 */}
      <Box
        sx={{
          background: "#FAFAFA",
          borderRadius: "15px",
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "15px",
        }}
        className="dark-BG-101010"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box className="mr-1">
            {Chart && (
              <Chart
                options={options}
                series={series}
                type="radialBar"
                height={60}
                width={60}
              />
            )}
          </Box>
          <Box>
            <Typography as="h3" fontSize="14px" fontWeight="500">
              Data With Python
            </Typography>
            <Typography fontSize="13px" color="#A9A9C8">
              5 Lessons
            </Typography>
          </Box>
        </Box>

        <Box color="#A9A9C8" fontSize="25px">
          <Link href="#" underline="none">
            <i className="ri-arrow-right-s-line"></i>
          </Link>
        </Box>
      </Box>

      {/* Course completion 2 */}
      <Box
        sx={{
          background: "#FAFAFA",
          borderRadius: "15px",
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "15px",
        }}
        className="dark-BG-101010"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {Chart && (
              <Chart
                options={options}
                series={series2}
                type="radialBar"
                height={60}
                width={60}
              />
            )}
          </Box>
          <Box>
            <Typography as="h3" fontSize="14px" fontWeight="500">
              Code Foundation
            </Typography>
            <Typography fontSize="13px" color="#A9A9C8">
              15 Lessons
            </Typography>
          </Box>
        </Box>

        <Box color="#A9A9C8" fontSize="25px">
          <Link href="#" underline="none">
            <i className="ri-arrow-right-s-line"></i>
          </Link>
        </Box>
      </Box>

      {/* Course completion 3 */}
      <Box
        sx={{
          background: "#FAFAFA",
          borderRadius: "15px",
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "15px",
        }}
        className="dark-BG-101010"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {Chart && (
              <Chart
                options={options}
                series={series3}
                type="radialBar"
                height={60}
                width={60}
              />
            )}
          </Box>
          <Box>
            <Typography as="h3" fontSize="14px" fontWeight="500">
              Styling With CSS
            </Typography>
            <Typography fontSize="13px" color="#A9A9C8">
              13 Lessons
            </Typography>
          </Box>
        </Box>

        <Box color="#A9A9C8" fontSize="25px">
          <Link href="#" underline="none">
            <i className="ri-arrow-right-s-line"></i>
          </Link>
        </Box>
      </Box>

      {/* Course completion 4 */}
      <Box
        sx={{
          background: "#FAFAFA",
          borderRadius: "15px",
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "15px",
        }}
        className="dark-BG-101010"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {Chart && (
              <Chart
                options={options}
                series={series4}
                type="radialBar"
                height={60}
                width={60}
              />
            )}
          </Box>
          <Box>
            <Typography as="h3" fontSize="14px" fontWeight="500">
              Code Learn
            </Typography>
            <Typography fontSize="13px" color="#A9A9C8">
              15 Lessons
            </Typography>
          </Box>
        </Box>

        <Box color="#A9A9C8" fontSize="25px">
          <Link href="#" underline="none">
            <i className="ri-arrow-right-s-line"></i>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default CourseCompletionList;
