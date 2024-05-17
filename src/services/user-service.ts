import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function updateUserBalance({
  db,
  userId,
  balance,
}: {
  db: PostgresJsDatabase;
  userId: string;
  balance: string;
}): Promise<void> {
  await db
    .update(users)
    .set({ balance: balance.toString() })
    .where(eq(users.id, userId));
}
