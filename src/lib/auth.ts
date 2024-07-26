// Type imports first
import type { Adapter } from "next-auth/adapters";
import { AuthOptions } from "next-auth";

// External library imports
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

// Local imports
import prismaClient from "./prisma";

// Define authentication options for NextAuth
export const authOptions: AuthOptions = {
  // Use PrismaAdapter for database interactions
  adapter: PrismaAdapter(prismaClient) as Adapter,
  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // Session callback to include user ID in the session object
  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
      };

      return session;
    },
  },
};
