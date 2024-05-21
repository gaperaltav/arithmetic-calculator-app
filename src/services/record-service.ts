import db from "@/db";
import { operations, records } from "@/db/schema";
import { count, eq } from "drizzle-orm";
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

export async function getRecordsByUserId(
  userId: string,
  page = 1,
  pageSize = 5
) {
  return await db
    .select()
    .from(records)
    .where(eq(records.userId, userId))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getTotalRecordsByUser(userId: string){
  return await db.select({ count: count() }).from(records);
}
