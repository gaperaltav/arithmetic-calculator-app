"use server";

import pgClient from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";

const db = drizzle(pgClient);

export async function getUserByEmail(email: string) {
  const userResult = (await db
    .select()
    .from(users)
    .where(eq(users.email, email))) as (typeof users.$inferSelect)[];

  if (userResult && userResult.length > 0) {
    return userResult[0];
  }

  throw new Error("user not found");
}
