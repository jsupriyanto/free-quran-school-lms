import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import authService from "@/services/auth.service";

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
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        const oAuthToken = account?.id_token || account?.access_token;
        const name = token?.name || token?.email?.split('@')[0];
        const firstName = name?.split(' ')[0] || name;
        const lastName = name?.split(' ').slice(1).join(' ') || '';

        // call auth service to get user info
        const signInRequest = {
          email: token?.email,
          token: oAuthToken,
          provider: account?.provider,
          expiresAt: account?.expires_at,
          tokenType: account?.token_type,
          firstName: firstName,
          lastName: lastName
        };

        try {
          // Call auth service to get user info
          const response = await authService.signInWithOAuth(signInRequest);
          if (response && response.data && response.data.accessToken) {
            // Store user data in the JWT token (server-side)
            token.user = response.data;
          }
        } catch (error) {
          console.error("OAuth sign-in error:", error);
        }
      }

      // Always return token object (never null)
      return token;
    },
    
    async session({ session, token }) {
      // Pass user data from JWT token to session
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
