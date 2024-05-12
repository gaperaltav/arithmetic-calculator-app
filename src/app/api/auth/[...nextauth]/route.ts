import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Adapter } from "next-auth/adapters";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const handlers = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "your credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials!.username || "";
        const password = credentials!.password || "";
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email));
        // If no error and we have user data, return it
        if (user && user.length > 0) {
          const loggedUser = user[0];
          if (loggedUser.password === password) {
            return {
              id: loggedUser.id,
              name: loggedUser.name,
              email: loggedUser.email,
              image: loggedUser.image,
            };
          }
          return null
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
});

export { handlers as GET, handlers as POST };
