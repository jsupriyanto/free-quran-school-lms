import http from "./http-common";

// Helper functions for third-party sign-in tracking
const getThirdPartySignInProgress = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("thirdPartySignInProgress") === "true";
  }
  return false;
}

class AuthService {
  signin(username, password) {
    return http.post("/auth/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  isTokenExpiringSoon(token, bufferMinutes = 5) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      const bufferTime = bufferMinutes * 60; // Convert minutes to seconds
      return payload.exp < (now + bufferTime);
    } catch (error) {
      console.error("Error parsing token for expiry check:", error);
      return true; // Consider invalid tokens as expired
    }
  }

  signup(firstName, lastName, username, password) {
    return http.post("/auth/signup", { firstName, lastName, username, password });
  }

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsed = JSON.parse(user);
          
          // Check if token is expired
          if (parsed.accessToken) {
            try {
              const payload = JSON.parse(atob(parsed.accessToken.split('.')[1]));
              const now = Math.floor(Date.now() / 1000);
              
              if (payload.exp < now) {
                // Only clear user data if not in third-party sign-in progress
                if (!getThirdPartySignInProgress()) {
                  localStorage.removeItem("user");
                  return null;
                } else {
                  return parsed; // Return the user data even if expired during OAuth
                }
              }
            } catch (tokenError) {
              console.error("Error parsing JWT token:", tokenError);
              // Only clear user data if not in third-party sign-in progress
              if (!getThirdPartySignInProgress()) {
                localStorage.removeItem("user");
                return null;
              } else {
                return parsed; // Return the user data even if token is invalid during OAuth
              }
            }
          }
          
          return parsed;
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          // Don't automatically clear corrupted data during OAuth flows
          // Return null and let the authentication provider handle it
          return null;
        }
      }
    }
    return null;
  }

  signout() {
    if (localStorage === undefined) return;
    localStorage.removeItem("user");
  }

  signInWithOAuth(signInRequest) {
    return http.post("/auth/oauth", signInRequest);
  }

  refreshToken() {
    const user = this.getCurrentUser();
    if (!user) {
      return Promise.reject(new Error('No user available'));
    }

    // Check if this is an OAuth user (Google/Facebook)
    if (user.oauthProvider && user.oauthRefreshToken) {
      return this.refreshOAuthToken(user);
    }

    // Standard refresh token flow for regular users
    if (!user.refreshToken) {
      return Promise.reject(new Error('No refresh token available'));
    }

    return http.post("/auth/refresh", { refreshToken: user.refreshToken })
      .then((response) => {
        if (response.data.accessToken) {
          // Update the stored user data with new tokens
          const updatedUser = {
            ...user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken || user.refreshToken, // Keep existing refresh token if new one not provided
            expiresAt: response.data.expiresAt
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        }
        throw new Error('No access token in refresh response');
      })
      .catch((error) => {
        console.error('Token refresh failed:', error);
        // Clear user data if refresh fails
        this.signout();
        throw error;
      });
  }

  async refreshOAuthToken(user) {
    try {
      // Import next-auth/react dynamically to avoid SSR issues
      const { getSession } = await import('next-auth/react');
      const session = await getSession();
      
      if (session && session.user && session.user.accessToken) {
        // Check if we have a fresher token from NextAuth
        if (session.user.accessToken !== user.accessToken) {
          const updatedUser = {
            ...user,
            ...session.user,
            refreshToken: user.refreshToken, // Preserve existing refresh token if any
          };
          
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
      
      // If NextAuth session has error, handle it
      if (session && session.error === "RefreshAccessTokenError") {
        console.error('OAuth token refresh failed in NextAuth');
        this.signout();
        throw new Error('OAuth token refresh failed');
      }
      
      // If no session or same token, try backend refresh as fallback
      if (user.refreshToken) {
        return this.refreshBackendToken(user);
      }
      
      throw new Error('No OAuth refresh mechanism available');
    } catch (error) {
      console.error('OAuth token refresh failed:', error);
      this.signout();
      throw error;
    }
  }

  refreshBackendToken(user) {
    return http.post("/auth/refresh", { refreshToken: user.refreshToken })
      .then((response) => {
        if (response.data.accessToken) {
          const updatedUser = {
            ...user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken || user.refreshToken,
            expiresAt: response.data.expiresAt
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        }
        throw new Error('No access token in refresh response');
      });
  }

  setThirdPartySignInProgress(value) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("thirdPartySignInProgress", value);
    }
    return true;
  }

  getThirdPartySignInProgress() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("thirdPartySignInProgress") === "true";
    }
    return false;
  }

  // Helper method to manually trigger token refresh if needed
  async ensureValidToken() {
    const user = this.getCurrentUser();
    if (!user || !user.accessToken) {
      throw new Error('No user or access token found');
    }

    if (this.isTokenExpiringSoon(user.accessToken)) {
      return await this.refreshToken();
    }

    return user;
  }
}

export default new AuthService();
