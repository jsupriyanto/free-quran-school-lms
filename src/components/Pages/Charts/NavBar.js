"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/Pages/Charts/NavBar.module.css";
import { useParams } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();


  return (
    <>
      <nav className={styles.topNavStyle}>
        <ul>
          <li
            className={
              pathname == "/pages/apexcharts/" ? styles.active : ""
            }
          >
            <Link href="/pages/apexcharts/">ApexCharts</Link>
          </li>
          <li
            className={
              pathname == "/pages/recharts/" ? styles.active : ""
            }
          >
            <Link href="/pages/recharts/">Recharts</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
