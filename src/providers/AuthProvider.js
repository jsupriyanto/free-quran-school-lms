"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Helper functions for third-party sign-in tracking
const getThirdPartySignInProgress = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("thirdPartySignInProgress") === "true";
  }
  return false;
}

const setThirdPartySignInProgress = (value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("thirdPartySignInProgress", value);
  }
}

// OAuth Session Handler Component
function OAuthSessionHandler({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hasProcessedSession = useRef(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Skip processing if already redirecting or if window is not available
    if (isRedirecting || typeof window === 'undefined') {
      return;
    }

    // Handle OAuth token refresh errors
    if (status === "authenticated" && session?.error === "RefreshAccessTokenError") {
      localStorage.removeItem("user");
      setThirdPartySignInProgress(false);
      setIsRedirecting(true);
      router.push('/authentication/sign-in');
      return;
    }

    if (status === "authenticated" && session?.user) {
      // Only handle OAuth sessions that have accessToken (from our backend)
      if (session.user.accessToken && !hasProcessedSession.current) {
        const existingUser = localStorage.getItem("user");
        
        // If no existing user in localStorage, this is a fresh OAuth login
        if (!existingUser) {
          localStorage.setItem("user", JSON.stringify(session.user));
          hasProcessedSession.current = true;
          
          // Clear third-party sign-in progress flag after successful OAuth
          setThirdPartySignInProgress(false);
          
          // Only redirect if we're on an authentication page
          if (pathname.includes('/authentication/')) {
            setIsRedirecting(true);
            router.push('/');
            return;
          }
        } else {
          // If user exists in localStorage but session has new data, update it
          try {
            const localUser = JSON.parse(existingUser);
            if (localUser.accessToken !== session.user.accessToken) {
              localStorage.setItem("user", JSON.stringify(session.user));
              hasProcessedSession.current = true;
              
              // Clear third-party sign-in progress flag after successful token update
              setThirdPartySignInProgress(false);
            } else {
              hasProcessedSession.current = true;
              
              // Clear third-party sign-in progress flag for existing valid session
              setThirdPartySignInProgress(false);
            }
          } catch (error) {
            // If localStorage data is corrupted, clear it and set new user data
            // Only clear if not in third-party sign-in progress (though this should be safe in OAuth context)
            if (!getThirdPartySignInProgress()) {
              localStorage.removeItem("user");
            }
            localStorage.setItem("user", JSON.stringify(session.user));
            hasProcessedSession.current = true;
            
            // Clear third-party sign-in progress flag after fixing corrupted data
            setThirdPartySignInProgress(false);
          }
        }
      }
    }
    
    // If user is already authenticated (has localStorage data) and visits sign-in page, redirect
    if (status !== "loading" && !isRedirecting) {
      const existingUser = localStorage.getItem("user");
      if (existingUser && pathname.includes('/authentication/sign-in')) {
        try {
          const userData = JSON.parse(existingUser);
          if (userData.accessToken) {
            setIsRedirecting(true);
            router.push('/');
            return;
          }
        } catch (error) {
          // If localStorage data is corrupted, clear it
          // Only clear if not in third-party sign-in progress
          if (!getThirdPartySignInProgress()) {
            localStorage.removeItem("user");
          }
        }
      }
    }
  }, [session, status, router, pathname, isRedirecting]);

  // Reset the processed flag when session changes to unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      hasProcessedSession.current = false;
      setIsRedirecting(false);
    }
  }, [status]);

  // Reset redirecting flag when pathname changes (navigation completed)
  useEffect(() => {
    setIsRedirecting(false);
  }, [pathname]);

  return children;
}

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <OAuthSessionHandler>
        {children}
      </OAuthSessionHandler>
    </SessionProvider>
  );
}