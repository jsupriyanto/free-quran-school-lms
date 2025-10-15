"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// OAuth Session Handler Component
function OAuthSessionHandler({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && status === "authenticated" && session?.user) {
      // Only handle OAuth sessions that have accessToken (from our backend)
      if (session.user.accessToken) {
        const existingUser = localStorage.getItem("user");
        
        // If no existing user in localStorage, this is a fresh OAuth login
        if (!existingUser) {
          localStorage.setItem("user", JSON.stringify(session.user));
          
          // Only redirect if we're on the sign-in page
          if (pathname.includes('/authentication/sign-in')) {
            router.push('/');
          }
        }
      }
    }
  }, [session, status, router, pathname]);

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