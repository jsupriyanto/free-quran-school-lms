"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import enrollmentService from "@/services/enrollment.service";

const YourProgress = () => {
  const [data, selectData] = useState([]);

  const originalConsoleError = console.error;
  console.error = (message, ...args) => {
    if (
      typeof message === "string" &&
      message.includes("defaultProps will be removed")
    ) {
      return;
    }
    originalConsoleError.apply(console, [message, ...args]);
  };
  
  // Select Form
  const [select, setSelect] = React.useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    enrollmentService.getEnrollmentProgress().then((res) => {
      selectData(res.data);
    });
  }, []);

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            marginBottom: "30px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Enrollment Progress
          </Typography>
        </Box>
 
        <ResponsiveContainer width="100%" height={490}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDEFF5" />
            <XAxis dataKey="month" padding={{ left: 30, right: 30 }} stroke="#A9A9C8" fontSize={14}  />
            <YAxis unit="" stroke="#A9A9C8" fontSize={14} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="#757FEF"
              activeDot={{ r: 8 }}
              unit="" 
            />
            <Line type="monotone" dataKey="lastYear" stroke="#2DB6F5" unit=" Hours" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default YourProgress;
