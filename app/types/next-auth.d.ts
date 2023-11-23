// my-project/types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    error?: string;
  }

  interface Account {
    refresh_expires_in: number;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpired?: number;
    refreshTokenExpired?: number;
    user?: User;
    error?: string;
  }
}
