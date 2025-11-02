"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import LeftSidebar from "@/components/Layouts/LeftSidebar";
import TopNavbar from "@/components/Layouts/TopNavbar";
import Footer from "@/components/Layouts/Footer";
import ScrollToTop from "../components/Layouts/ScrollToTop";
import ControlPanelModal from "../components/Layouts/ControlPanelModal";
import { shouldBlockAppAccess, getBlockedUserRedirectPath, isAuthenticated } from "@/utils/accessControl";

const LayoutProvider = ({ children }) => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toogleActive = () => {
    setActive(!active);
  };

  // Check if user should be blocked from accessing the app
  useEffect(() => {
    // Don't block authentication pages
    const isAuthPage = pathname === "/authentication/sign-in" ||
      pathname.endsWith("/authentication/sign-in/") ||
      pathname === "/authentication/sign-up" ||
      pathname.endsWith("/authentication/sign-up/") ||
      pathname === "/authentication/forgot-password" ||
      pathname.endsWith("/authentication/forgot-password/") ||
      pathname === "/authentication/lock-screen" ||
      pathname.endsWith("/authentication/lock-screen/") ||
      pathname === "/authentication/confirm-mail" ||
      pathname.endsWith("/authentication/confirm-mail/") ||
      pathname === "/authentication/logout" ||
      pathname.endsWith("/authentication/logout/");

    if (!isAuthPage && shouldBlockAppAccess()) {
      router.push(getBlockedUserRedirectPath());
    }
  }, [pathname, router]);
  return (
    <>
      <div className={`main-wrapper-content ${active && "active"}`}>
        {!(
          pathname === "/authentication/sign-in" ||
          pathname.endsWith("/authentication/sign-in/") ||
          pathname === "/authentication/sign-up" ||
          pathname.endsWith("/authentication/sign-up/") ||
          pathname === "/authentication/forgot-password" ||
          pathname.endsWith("/authentication/forgot-password/") ||
          pathname === "/authentication/lock-screen" ||
          pathname.endsWith("/authentication/lock-screen/") ||
          pathname === "/authentication/confirm-mail" ||
          pathname.endsWith("/authentication/confirm-mail/") ||
          pathname === "/authentication/logout" ||
          pathname.endsWith("/authentication/logout/") 
        ) && (
          <>
            <TopNavbar toogleActive={toogleActive} />

            <LeftSidebar toogleActive={toogleActive} />
          </>
        )}

        <div className="main-content">
          {children}
          {!(
            pathname === "/authentication/sign-in" ||
            pathname.endsWith("/authentication/sign-in/") ||
            pathname === "/authentication/sign-up" ||
            pathname.endsWith("/authentication/sign-up/") ||
            pathname === "/authentication/forgot-password" ||
            pathname.endsWith("/authentication/forgot-password/") ||
            pathname === "/authentication/lock-screen" ||
            pathname.endsWith("/authentication/lock-screen/") ||
            pathname === "/authentication/confirm-mail" ||
            pathname.endsWith("/authentication/confirm-mail/") ||
            pathname === "/authentication/logout" ||
            pathname.endsWith("/authentication/logout/") 
          ) && <Footer />}
        </div>
      </div>

      {/* ScrollToTop */}
      <ScrollToTop />

      {!(
        pathname === "/authentication/sign-in/" ||
        pathname === "/authentication/sign-up/" ||
        pathname === "/authentication/forgot-password/" ||
        pathname === "/authentication/lock-screen/" ||
        pathname === "/authentication/confirm-mail/" ||
        pathname === "/authentication/logout/"
      ) && <ControlPanelModal />}
    </>
  );
};

export default LayoutProvider;
