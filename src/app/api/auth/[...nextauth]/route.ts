import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Adapter } from "next-auth/adapters";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "your email",
      credentials: {
        username: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials!.username || "";
        const password = credentials!.password || "";
        let user;

          user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        
        // If no error and we have user data, return it
        if (user && user.length > 0) {
          const loggedUser = user[0];
          if (loggedUser.password?.trim() === password.trim()) {
            return {
              id: loggedUser.id,
              name: loggedUser.name,
              email: loggedUser.email,
              image: loggedUser.image
            };
          }
          return null;
        } else {
           throw new Error('Please insert a valid user\'s email')
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session:{
    strategy: "jwt",
  },
  callbacks: {
    signIn(){
      return true
    }
  },
}

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
