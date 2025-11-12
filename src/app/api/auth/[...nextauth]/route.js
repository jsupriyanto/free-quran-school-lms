import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import authService from "@/services/auth.service";

// Configure route as dynamic for NextAuth
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshGoogleAccessToken(refreshToken) {
  try {
    const url = "https://oauth2.googleapis.com/token";
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      access_token: refreshedTokens.access_token,
      expires_in: refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token ?? refreshToken,
    };
  } catch (error) {
    throw error;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.provider = account.provider;
        
        const oAuthToken = account?.id_token || account?.access_token;
        const name = token?.name || token?.email?.split('@')[0];
        const firstName = name?.split(' ')[0] || name;
        const lastName = name?.split(' ').slice(1).join(' ') || '';

        // Call auth service to get user info
        const signInRequest = {
          email: token?.email,
          token: oAuthToken,
          provider: account?.provider,
          expiresAt: account?.expires_at,
          tokenType: account?.token_type,
          firstName: firstName,
          lastName: lastName,
          refreshToken: account?.refresh_token
        };

        try {
          // Call auth service to get user info
          const response = await authService.signInWithOAuth(signInRequest);
          if (response && response.data && response.data.accessToken) {
            // Store user data in the JWT token (server-side)
            token.user = {
              ...response.data,
              oauthProvider: account.provider,
              oauthRefreshToken: account.refresh_token,
              oauthExpiresAt: account.expires_at
            };
          }
        } catch (error) {
          // Don't store user data if the auth service call fails
          token.user = null;
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.expiresAt * 1000) {
        return token;
      }

      // Access token has expired, try to update it
      if (token.refreshToken) {
        try {
          let refreshedTokens;
          
          if (token.provider === 'google') {
            refreshedTokens = await refreshGoogleAccessToken(token.refreshToken);
          } else if (token.provider === 'facebook') {
            // Facebook tokens are long-lived and don't typically need refresh
            // But we can implement it if needed
            return token;
          } else {
            // For other providers, return error
            return { ...token, error: "RefreshAccessTokenError" };
          }
          
          return {
            ...token,
            accessToken: refreshedTokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
          };
        } catch (error) {
          // Return the old token and let the frontend handle the invalid token
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      // Always return token object (never null)
      return token;
    },
    
    async session({ session, token }) {
      // Pass user data from JWT token to session
      if (token && token.user) {
        session.user = { ...session.user, ...token.user };
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
