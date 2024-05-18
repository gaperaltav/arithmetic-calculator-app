import db from "@/db";
import { operations, records } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function insertNewRecord({
  db,
  operation,
  userId,
  operationResponse,
  userBalance,
}: {
  db: PostgresJsDatabase;
  operation: typeof operations.$inferSelect;
  userId: string;
  userBalance: string;
  operationResponse: string;
}): Promise<void> {
  await db.insert(records).values({
    operationId: operation.id,
    userId: userId,
    amount: operation.cost.toString(),
    operationResponse: operationResponse.toString(),
    userBalance,
  });
}

export async function getRecordsByUserId(userId: string) {
  return await db.select().from(records).where(eq(records.userId, userId));
}
