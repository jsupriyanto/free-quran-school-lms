"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/Pages/Charts/NavBar.module.css";
import { useParams } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const { lang } = useParams();

  return (
    <>
      <nav className={styles.topNavStyle}>
        <ul>
          <li
            className={
              pathname == `/${lang}/pages/apexcharts/` ? styles.active : ""
            }
          >
            <Link href={`/${lang}/pages/apexcharts/`}>ApexCharts</Link>
          </li>
          <li
            className={
              pathname == `/${lang}/pages/recharts/` ? styles.active : ""
            }
          >
            <Link href={`/${lang}/pages/recharts/`}>Recharts</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
