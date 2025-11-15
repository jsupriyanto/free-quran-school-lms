"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import styles from "@/components/Layouts/LeftSidebar/SubMenu.module.css";
import { usePathname } from "next/navigation";

const SidebarLabel = styled("span")(({ theme }) => ({
	position: "relative",
	top: "-3px",
}));

const SubMenu = ({ item }) => {
	const [subnav, setSubnav] = useState(false);
	const showSubnav = () => setSubnav(!subnav);
	const pathname = usePathname();
	
	// Add defensive check for item.path
	if (!item || !item.path) {
		console.warn('SubMenu received item without path:', item);
		return null;
	}
	
	return (
		<>
			<Link
				href={item.path}
				onClick={item.subNav && showSubnav}
				className={`${styles.sidebarLink} ${
					pathname == item.path && "sidebarLinkActive"
				}`}
			>
				<div>
					{item.icon}
					<SidebarLabel className="ml-1">{item.title}</SidebarLabel>
				</div>
				<div>
					{item.subNav && subnav
						? item.iconOpened
						: item.subNav
						? item.iconClosed
						: null}
				</div>
			</Link>
			{subnav &&
				item.subNav &&
				item.subNav.map((subItem, index) => {
					if (!subItem || !subItem.path) {
						console.warn('SubMenu received subItem without path:', subItem);
						return null;
					}
					return (
						<Link
							href={subItem.path}
							key={index}
							className={`${styles.sidebarLink2} ${
								pathname == subItem.path &&
								"sidebarLinkActive2"
							}`}
						>
							{subItem.icon}
							{subItem.title}
						</Link>
					);
				})}
		</>
	);
};

export default SubMenu;
