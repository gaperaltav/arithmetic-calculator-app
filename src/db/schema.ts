import { float } from "drizzle-orm/mysql-core";
import {
  numeric,
  pgTable,
  serial,
  date,
  text,
  smallint,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const operations = pgTable("operations", {
  id: serial("id").primaryKey(),
  type: numeric("type").$type<OperationType>(),
  createdDate: date("created_date", { mode: "string" }),
  updatedDate: date("updated_date", { mode: "string" }),
  deletedDate: date("deleted_date", { mode: "string" }),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userName: text("user_name"),
  password: text("password"),
  status: smallint("status").default(1),
  createdDate: date("created_date", { mode: "string" }),
  updatedDate: date("updated_date", { mode: "string" }),
  deletedDate: date("deleted_date", { mode: "string" }),
});

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  operationId: integer("operation_id")
    .references(() => operations.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  amount: doublePrecision("amount"),
  userBalance: doublePrecision("user_balance"),
  operationResponse: doublePrecision("operation_response"),
  createdDate: date("created_date", { mode: "string" }),
  updatedDate: date("updated_date", { mode: "string" }),
  deletedDate: date("deleted_date", { mode: "string" }),
});
