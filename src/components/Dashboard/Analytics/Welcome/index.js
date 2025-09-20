"use client";

import React from "react";
import styles from "@/components/Dashboard/Analytics/Welcome/Welcome.module.css";
import Image from "next/image";

const Welcome = () => {
  return (
    <>
      <div className={styles.welcomeBox}>
        <div className={styles.welcomeContent}>
          <h1>Welcome to Free Quran School LMS Dashboard!</h1>
          <p>
            You have done 68% 😎 more sales today. Check your new badge in your
            profile.
          </p>
        </div>
        <Image src="/images/shape-1.png" alt="shape" width={110} height={78}/>
      </div>
    </>
  );
};

export default Welcome;
