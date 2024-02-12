import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers

  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId:
        typeof process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID === "string"
          ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
          : "",
      clientSecret:
        typeof process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET === "string"
          ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
          : "",
    }),
  ],
};
export default NextAuth(authOptions);
