import { numeric, pgTable, serial, date } from "drizzle-orm/pg-core";

export const operations = pgTable("operations", {
  id: serial("id").primaryKey(),
  type: numeric("type").$type<OperationType>(),
  createdDate: date("created_date", { mode: "string" }),
  updatedDate: date("updated_date", { mode: "string" }),
  deletedDate: date("deleted_date", { mode: "string" })
});
