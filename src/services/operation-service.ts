import { operations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function getOperationCost({
  db,
  opType,
}: {
  db: PostgresJsDatabase;
  opType: number;
}): Promise<typeof operations.$inferSelect> {
  const opCost: (typeof operations.$inferSelect)[] = await db
    .select()
    .from(operations)
    .where(eq(operations.id, opType));
  return opCost[0];
}
