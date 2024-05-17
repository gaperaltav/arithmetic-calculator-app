import { operations, records } from "@/db/schema";
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
  operationResponse: number
}): Promise<void> {
  await db.insert(records).values({
    operationId: operation.id,
    userId: userId,
    amount: operation.cost.toString(),
    operationResponse: operationResponse.toString(),
    userBalance,
  });
}
