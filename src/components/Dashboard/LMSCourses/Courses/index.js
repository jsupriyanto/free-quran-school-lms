"use client";

import React from "react";
import Card from "@mui/material/Card";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HighProgressCourses from "./HighProgress";
import LowProgressCourses from "./LowProgress";
import styles from '@/components/Dashboard/LMSCourses/Courses/Tabs.module.css';

const Courses = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 15px",
          mb: "15px",
        }}
      >
        <Tabs className={styles.tabs}>
          <TabList>
            <Tab>High Progress</Tab>
            <Tab>Low Progress</Tab>
          </TabList>

          <TabPanel>
            <HighProgressCourses />
          </TabPanel>
          
          <TabPanel>
            <LowProgressCourses />
          </TabPanel>
        </Tabs>
      </Card>
    </>
  );
};

export default Courses;
