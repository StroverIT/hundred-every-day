import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      gender?: string | null;
      _id?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}
