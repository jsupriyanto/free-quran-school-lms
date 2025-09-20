"use client";

import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export const sidebarDataEN = [
	{
		title: "Dashboard",
		path: "/",
		icon: <GridViewIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "LMS Courses",
				path: "/lms-courses-dashboard/",
			},
			{
				title: "Help/Support Desk",
				path: "/help-desk-dashboard/",
			},
		],
	},
	{
		title: "Calendar",
		path: "/apps/calendar/",
		icon: <CalendarIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			
			{
				title: "Calendar",
				path: "/apps/calendar/",
			},
		],
	},
	{
		title: "Users",
		path: "/contact-list/members-list/",
		icon: <PostAddIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Profile",
				path: "/contact-list/profile/",
			},
		],
	},
	{
		title: "UI Elements",
		path: "/ui-elements/alerts/",
		icon: <ViewQuiltIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Alerts",
				path: "/ui-elements/alerts/",
			},
			{
				title: "Autocomplete",
				path: "/ui-elements/autocomplete/",
			},
			{
				title: "Avatar",
				path: "/ui-elements/avatar/",
			},
			{
				title: "Badge",
				path: "/ui-elements/badge/",
			},
			{
				title: "Buttons",
				path: "/ui-elements/buttons/",
			},
			{
				title: "Cards",
				path: "/ui-elements/cards/",
			},
			{
				title: "Checkbox",
				path: "/ui-elements/checkbox/",
			},
			{
				title: "Swiper Slider",
				path: "/ui-elements/swiper-slider/",
			},
			{
				title: "Radio",
				path: "/ui-elements/radio/",
			},
			{
				title: "Rating",
				path: "/ui-elements/rating/",
			},
			{
				title: "Select",
				path: "/ui-elements/select/",
			},
			{
				title: "Slider",
				path: "/ui-elements/slider/",
			},
			{
				title: "Switch",
				path: "/ui-elements/switch/",
			},
			{
				title: "Chip",
				path: "/ui-elements/chip/",
			},
			{
				title: "List",
				path: "/ui-elements/list/",
			},
			{
				title: "Modal",
				path: "/ui-elements/modal/",
			},
			{
				title: "Table",
				path: "/ui-elements/table/",
			},
			{
				title: "Tooltip",
				path: "/ui-elements/tooltip/",
			},
			{
				title: "Progress",
				path: "/ui-elements/progress/",
			},
			{
				title: "Skeleton",
				path: "/ui-elements/skeleton/",
			},
			{
				title: "Snackbar",
				path: "/ui-elements/snackbar/",
			},
			{
				title: "Accordion",
				path: "/ui-elements/accordion/",
			},
			{
				title: "Pagination",
				path: "/ui-elements/pagination/",
			},
			{
				title: "Stepper",
				path: "/ui-elements/stepper/",
			},
			{
				title: "Tabs",
				path: "/ui-elements/tabs/",
			},
			{
				title: "Image List",
				path: "/ui-elements/image-list/",
			},
			{
				title: "Transitions",
				path: "/ui-elements/transitions/",
			},
		],
	},
	{
		title: "Forms",
		path: "/forms/form-layouts/",
		icon: <CheckBoxOutlineBlankIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Basic Elements",
				path: "/forms/form-layouts/",
			},
			{
				title: "Advanced Elements",
				path: "/forms/advanced-elements/",
			},
			{
				title: "Editors",
				path: "/forms/editors/",
			},
			{
				title: "File Uploader",
				path: "/forms/file-uploader/",
			},
		],
	},
	{
		title: "Pages",
		path: "/pages/invoice/",
		icon: <ContentCopyIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Invoice",
				path: "/pages/invoice/",
			},
			{
				title: "Invoice Details",
				path: "/pages/invoice/details/",
			},
			{
				title: "ApexCharts",
				path: "/pages/apexcharts/",
			},
			{
				title: "Recharts",
				path: "/pages/recharts/",
			},
			{
				title: "Profile",
				path: "/pages/profile/",
			},
			{
				title: "Pricing",
				path: "/pages/pricing/",
			},
			{
				title: "Testimonials",
				path: "/pages/testimonials/",
			},
			{
				title: "Timeline",
				path: "/pages/timeline/",
			},
			{
				title: "FAQ",
				path: "/pages/faq/",
			},
			{
				title: "Gallery",
				path: "/pages/gallery/",
			},
			{
				title: "Support",
				path: "/pages/support/",
			},
			{
				title: "Search",
				path: "/pages/search/",
			},
			{
				title: "Material Icons",
				path: "/pages/material-icons/",
			},
			{
				title: "Remixicon",
				path: "/pages/remixicon/",
			},
			{
				title: "Maps",
				path: "/pages/maps/",
			},
			{
				title: "404 Error Page",
				path: "/404/",
			},
			{
				title: "Terms & Conditions",
				path: "/pages/terms-conditions/",
			},
		],
	},
	{
		title: "Authentication",
		path: "/authentication/sign-up/",
		icon: <LockIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Sign Up",
				path: "/authentication/sign-up/",
			},
			{
				title: "Forgot Password",
				path: "/authentication/forgot-password/",
			},
			{
				title: "Lock Screen",
				path: "/authentication/lock-screen/",
			},
			{
				title: "Confirm Mail",
				path: "/authentication/confirm-mail/",
			},
			{
				title: "Logout",
				path: "/authentication/logout/",
			},
		],
	},
	{
		title: "Notification",
		path: "/notification/",
		icon: <NotificationsNoneIcon />,
	},
	{
		title: "Settings",
		path: "/settings/account/",
		icon: <SettingsIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Account",
				path: "/settings/account/",
			},
			{
				title: "Security",
				path: "/settings/security/",
			},
			{
				title: "Privacy Policy",
				path: "/settings/privacy-policy/",
			},
			{
				title: "Terms & Conditions",
				path: "/pages/terms-conditions/",
			},
			{
				title: "Logout",
				path: "/authentication/logout/",
			},
		],
	},
];

export const sidebarDataAR = [
	{
		title: "لوحة القيادة",
		path: "/",
		icon: <GridViewIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "التجارة الإلكترونية",
				path: "/",
			},
			{
				title: "دورات LMS",
				path: "/lms-courses-dashboard/",
			},
			{
				title: "مكتب المساعدة/الدعم",
				path: "/help-desk-dashboard/",
			}
		],
	},
	{
		title: "تقويم",
		path: "/apps/calendar/",
		icon: <CalendarIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,
		subNav: [],
	},
	{
		title: "قائمة الأعضاء",
		path: "/contact-list/members-list/",
		icon: <PostAddIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "حساب تعريفي",
				path: "/contact-list/profile/",
			},
		],
	},
	{
		title: "UI Elements",
		path: "/ui-elements/alerts/",
		icon: <ViewQuiltIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Alerts",
				path: "/ui-elements/alerts/",
			},
			{
				title: "Autocomplete",
				path: "/ui-elements/autocomplete/",
			},
			{
				title: "Avatar",
				path: "/ui-elements/avatar/",
			},
			{
				title: "Badge",
				path: "/ui-elements/badge/",
			},
			{
				title: "Buttons",
				path: "/ui-elements/buttons/",
			},
			{
				title: "Cards",
				path: "/ui-elements/cards/",
			},
			{
				title: "Checkbox",
				path: "/ui-elements/checkbox/",
			},
			{
				title: "Swiper Slider",
				path: "/ui-elements/swiper-slider/",
			},
			{
				title: "Radio",
				path: "/ui-elements/radio/",
			},
			{
				title: "Rating",
				path: "/ui-elements/rating/",
			},
			{
				title: "Select",
				path: "/ui-elements/select/",
			},
			{
				title: "Slider",
				path: "/ui-elements/slider/",
			},
			{
				title: "Switch",
				path: "/ui-elements/switch/",
			},
			{
				title: "Chip",
				path: "/ui-elements/chip/",
			},
			{
				title: "List",
				path: "/ui-elements/list/",
			},
			{
				title: "Modal",
				path: "/ui-elements/modal/",
			},
			{
				title: "Table",
				path: "/ui-elements/table/",
			},
			{
				title: "Tooltip",
				path: "/ui-elements/tooltip/",
			},
			{
				title: "Progress",
				path: "/ui-elements/progress/",
			},
			{
				title: "Skeleton",
				path: "/ui-elements/skeleton/",
			},
			{
				title: "Snackbar",
				path: "/ui-elements/snackbar/",
			},
			{
				title: "Accordion",
				path: "/ui-elements/accordion/",
			},
			{
				title: "Pagination",
				path: "/ui-elements/pagination/",
			},
			{
				title: "Stepper",
				path: "/ui-elements/stepper/",
			},
			{
				title: "Tabs",
				path: "/ui-elements/tabs/",
			},
			{
				title: "Image List",
				path: "/ui-elements/image-list/",
			},
			{
				title: "Transitions",
				path: "/ui-elements/transitions/",
			},
		],
	},
	{
		title: "Forms",
		path: "/forms/form-layouts/",
		icon: <CheckBoxOutlineBlankIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Basic Elements",
				path: "/forms/form-layouts/",
			},
			{
				title: "Advanced Elements",
				path: "/forms/advanced-elements/",
			},
			{
				title: "Editors",
				path: "/forms/editors/",
			},
			{
				title: "File Uploader",
				path: "/forms/file-uploader/",
			},
		],
	},
	{
		title: "Pages",
		path: "/pages/invoice/",
		icon: <ContentCopyIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Invoice",
				path: "/pages/invoice/",
			},
			{
				title: "Invoice Details",
				path: "/pages/invoice/details/",
			},
			{
				title: "ApexCharts",
				path: "/pages/apexcharts/",
			},
			{
				title: "Recharts",
				path: "/pages/recharts/",
			},
			{
				title: "Profile",
				path: "/pages/profile/",
			},
			{
				title: "Pricing",
				path: "/pages/pricing/",
			},
			{
				title: "Testimonials",
				path: "/pages/testimonials/",
			},
			{
				title: "Timeline",
				path: "/pages/timeline/",
			},
			{
				title: "FAQ",
				path: "/pages/faq/",
			},
			{
				title: "Gallery",
				path: "/pages/gallery/",
			},
			{
				title: "Support",
				path: "/pages/support/",
			},
			{
				title: "Search",
				path: "/pages/search/",
			},
			{
				title: "Material Icons",
				path: "/pages/material-icons/",
			},
			{
				title: "Remixicon",
				path: "/pages/remixicon/",
			},
			{
				title: "Maps",
				path: "/pages/maps/",
			},
			{
				title: "404 Error Page",
				path: "/404/",
			},
			{
				title: "Terms & Conditions",
				path: "/pages/terms-conditions/",
			},
		],
	},
	{
		title: "Authentication",
		path: "/authentication/sign-up/",
		icon: <LockIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Sign Up",
				path: "/authentication/sign-up/",
			},
			{
				title: "Forgot Password",
				path: "/authentication/forgot-password/",
			},
			{
				title: "Lock Screen",
				path: "/authentication/lock-screen/",
			},
			{
				title: "Confirm Mail",
				path: "/authentication/confirm-mail/",
			},
			{
				title: "Logout",
				path: "/authentication/logout/",
			},
		],
	},
	{
		title: "Notification",
		path: "/notification/",
		icon: <NotificationsNoneIcon />,
	},
	{
		title: "Settings",
		path: "/settings/account/",
		icon: <SettingsIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Account",
				path: "/settings/account/",
			},
			{
				title: "Security",
				path: "/settings/security/",
			},
			{
				title: "Privacy Policy",
				path: "/settings/privacy-policy/",
			},
			{
				title: "Terms & Conditions",
				path: "/pages/terms-conditions/",
			},
			{
				title: "Logout",
				path: "/authentication/logout/",
			},
		],
	},
];

export const sidebarDataDE = [
	{
		title: "Armaturenbrett",
		path: "/",
		icon: <GridViewIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "e-Einkauf",
				path: "/",
			},
			{
				title: "Analyse",
				path: "/analytics-dashboard/",
			},
			{
				title: "Projektmanagement",
				path: "/project-management-dashboard/",
			},
			{
				title: "LMS-Kurse",
				path: "/lms-courses-dashboard/",
			},
			{
				title: "Krypto",
				path: "/crypto-dashboard/",
			},
			{
				title: "Hilfe-/Support-Desk",
				path: "/help-desk-dashboard/",
			},
			{
				title: "SaaS App",
				path: "/saas-app-dashboard/",
			},
		],
	},
	{
		title: "Kalender",
		path: "/apps/calendar/",
		icon: <CalendarIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [],
	},
	{
		title: "Mitgliederliste",
		path: "/contact-list/members-list/",
		icon: <PostAddIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Profil",
				path: "/contact-list/profile/",
			},
		],
	},
	{
		title: "UI Elements",
		path: "/ui-elements/alerts/",
		icon: <ViewQuiltIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Alerts",
				path: "/ui-elements/alerts/",
			},
			{
				title: "Autocomplete",
				path: "/ui-elements/autocomplete/",
			},
			{
				title: "Avatar",
				path: "/ui-elements/avatar/",
			},
			{
				title: "Badge",
				path: "/ui-elements/badge/",
			},
			{
				title: "Buttons",
				path: "/ui-elements/buttons/",
			},
			{
				title: "Cards",
				path: "/ui-elements/cards/",
			},
			{
				title: "Checkbox",
				path: "/ui-elements/checkbox/",
			},
			{
				title: "Swiper Slider",
				path: "/ui-elements/swiper-slider/",
			},
			{
				title: "Radio",
				path: "/ui-elements/radio/",
			},
			{
				title: "Rating",
				path: "/ui-elements/rating/",
			},
			{
				title: "Select",
				path: "/ui-elements/select/",
			},
			{
				title: "Slider",
				path: "/ui-elements/slider/",
			},
			{
				title: "Switch",
				path: "/ui-elements/switch/",
			},
			{
				title: "Chip",
				path: "/ui-elements/chip/",
			},
			{
				title: "List",
				path: "/ui-elements/list/",
			},
			{
				title: "Modal",
				path: "/ui-elements/modal/",
			},
			{
				title: "Table",
				path: "/ui-elements/table/",
			},
			{
				title: "Tooltip",
				path: "/ui-elements/tooltip/",
			},
			{
				title: "Progress",
				path: "/ui-elements/progress/",
			},
			{
				title: "Skeleton",
				path: "/ui-elements/skeleton/",
			},
			{
				title: "Snackbar",
				path: "/ui-elements/snackbar/",
			},
			{
				title: "Accordion",
				path: "/ui-elements/accordion/",
			},
			{
				title: "Pagination",
				path: "/ui-elements/pagination/",
			},
			{
				title: "Stepper",
				path: "/ui-elements/stepper/",
			},
			{
				title: "Tabs",
				path: "/ui-elements/tabs/",
			},
			{
				title: "Image List",
				path: "/ui-elements/image-list/",
			},
			{
				title: "Transitions",
				path: "/ui-elements/transitions/",
			},
		],
	},
	{
		title: "Forms",
		path: "/forms/form-layouts/",
		icon: <CheckBoxOutlineBlankIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Basic Elements",
				path: "/forms/form-layouts/",
			},
			{
				title: "Advanced Elements",
				path: "/forms/advanced-elements/",
			},
			{
				title: "Editors",
				path: "/forms/editors/",
			},
			{
				title: "File Uploader",
				path: "/forms/file-uploader/",
			},
		],
	},
	{
		title: "Pages",
		path: "/pages/invoice/",
		icon: <ContentCopyIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Invoice",
				path: "/pages/invoice/",
			},
			{
				title: "Invoice Details",
				path: "/pages/invoice/details/",
			},
			{
				title: "ApexCharts",
				path: "/pages/apexcharts/",
			},
			{
				title: "Recharts",
				path: "/pages/recharts/",
			},
			{
				title: "Profile",
				path: "/pages/profile/",
			},
			{
				title: "Pricing",
				path: "/pages/pricing/",
			},
			{
				title: "Testimonials",
				path: "/pages/testimonials/",
			},
			{
				title: "Timeline",
				path: "/pages/timeline/",
			},
			{
				title: "FAQ",
				path: "/pages/faq/",
			},
			{
				title: "Gallery",
				path: "/pages/gallery/",
			},
			{
				title: "Support",
				path: "/pages/support/",
			},
			{
				title: "Search",
				path: "/pages/search/",
			},
			{
				title: "Material Icons",
				path: "/pages/material-icons/",
			},
			{
				title: "Remixicon",
				path: "/pages/remixicon/",
			},
			{
				title: "Maps",
				path: "/pages/maps/",
			},
			{
				title: "404 Error Page",
				path: "/404/",
			},
			{
				title: "Terms & Conditions",
				path: "/pages/terms-conditions/",
			},
		],
	},
	{
		title: "Authentication",
		path: "/authentication/sign-up/",
		icon: <LockIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Sign Up",
				path: "/authentication/sign-up/",
			},
			{
				title: "Forgot Password",
				path: "/authentication/forgot-password/",
			},
			{
				title: "Lock Screen",
				path: "/authentication/lock-screen/",
			},
			{
				title: "Confirm Mail",
				path: "/authentication/confirm-mail/",
			},
			{
				title: "Logout",
				path: "/authentication/logout/",
			},
		],
	},
	{
		title: "Notification",
		path: "/notification/",
		icon: <NotificationsNoneIcon />,
	},
	{
		title: "Settings",
		path: "/settings/account/",
		icon: <SettingsIcon />,
		iconClosed: <KeyboardArrowRightIcon />,
		iconOpened: <KeyboardArrowDownIcon />,

		subNav: [
			{
				title: "Account",
				path: "/settings/account/",
			},
			{
				title: "Security",
				path: "/settings/security/",
			},
			{
				title: "Privacy Policy",
				path: "/settings/privacy-policy/",
			},
			{
				title: "Terms & Conditions",
				path: "/pages/terms-conditions/",
			},
			{
				title: "Logout",
				path: "/authentication/logout/",
			},
		],
	},
];
