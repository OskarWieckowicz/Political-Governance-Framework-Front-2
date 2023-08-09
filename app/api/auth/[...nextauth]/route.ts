import NextAuth, { NextAuthOptions } from "next-auth";
import { OAuthUserConfig } from "next-auth/providers";
import KeycloakProvider from "next-auth/providers/keycloak";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("token:", token);
  //     console.log("user:", user);
  //     return { ...token, ...user };
  //   },
  //   async session({ session, token, user }) {
  //     console.log("token2:", token);
  //     session.user = token as any;
  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
