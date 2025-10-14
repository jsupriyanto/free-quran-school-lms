import * as React from "react";
import "../../styles/remixicon.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
// Chat Styles
import "../../styles/chat.css";
// Globals Styles
import "../../styles/globals.css";
// Rtl Styles
import "../../styles/rtl.css";
// Dark Mode Styles
import "../../styles/dark.css";
// Theme Styles
import theme from "@/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LayoutProvider from "@/providers/LayoutProvider";

export const metadata = {
	title: "Free Quran School - Learning Management Dashboard",
	description: "Free Quran School is a free online learning management system for Quran education.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<body>
					<AppRouterCacheProvider options={{ enableCssLayer: true }}>
						<ThemeProvider theme={theme}>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />

							<LayoutProvider>{children}</LayoutProvider>
						</ThemeProvider>
					</AppRouterCacheProvider>
			</body>
		</html>
	);
}
