// NextAuth
import NextAuth from "next-auth/next";
import options from "./options";

export const dynamic = "force-dynamic"

// @ts-ignore
const handler = NextAuth(options);

export { handler as GET, handler as POST };
