import { operations, records } from "@/db/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function insertNewRecord({
  db,
  operation,
  userId,
  userBalance,
}: {
  db: PostgresJsDatabase;
  operation: typeof operations.$inferSelect;
  userId: string;
  userBalance: string;
}): Promise<void> {
  await db.insert(records).values({
    operationId: operation.id,
    userId: userId,
    amount: operation.cost.toString(),
    userBalance,
  });
}
