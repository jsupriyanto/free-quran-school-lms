"use client";

import React from "react";
import Button from "@mui/material/Button";
import styles from "@/components/Layouts/ControlPanelModal/RTLSwitch.module.css";
import { Typography } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";

const RTLSwitch = () => {
	const { lang } = useParams();
	const pathname = usePathname();
	const router = useRouter();

	function switchLocale(locale) {
		const currentLocale = pathname.split("/")[1]; // Extract current language code
		const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
		router.push(`${newPath}`, undefined, { shallow: true });
	}
	return (
		<>
			<div className={styles.darkModeBox}>
				<Typography
					as="h2"
					sx={{
						color: "#000 !important",
						fontSize: 16,
						fontWeight: 500,
						mb: "15px",
						pb: "5px",
						borderBottom: "1px solid #eee",
					}}
				>
					LTR/RTL Demos
				</Typography>

				<div className="lang-sidebar">
					<Button
						variant="contained"
						sx={{
							textTransform: "capitalize",
							fontSize: "13px",
						}}
						className={`${
							lang === "en" ? "redColor" : "whiteColor"
						} mr-10px`}
						onClick={() => switchLocale("en")}
					>
						English
					</Button>
					<Button
						variant="contained"
						sx={{
							textTransform: "capitalize",
							fontSize: "13px",
						}}
						className={`${
							lang === "ar" ? "redColor" : "whiteColor"
						} mr-10px`}
						onClick={() => switchLocale("ar")}
					>
						Arabic
					</Button>
					<Button
						variant="contained"
						sx={{
							textTransform: "capitalize",
							fontSize: "13px",
						}}
						className={`${
							lang === "de" ? "redColor" : "whiteColor"
						} mr-10px`}
						onClick={() => switchLocale("de")}
					>
						German
					</Button>
				</div>
			</div>
		</>
	);
};

export default RTLSwitch;
