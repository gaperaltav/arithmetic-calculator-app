import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  numeric,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  status: text("status").default("active"),
  email: text("email").notNull(),
  password: text("password"),
  balance: numeric("balance", { precision: 100, scale: 2 }),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdDate: timestamp("created_date", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "string" }),
  deletedDate: timestamp("deleted_date", { mode: "string" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    createdDate: timestamp("created_date", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedDate: timestamp("updated_date", { mode: "string" }),
    deletedDate: timestamp("deleted_date", { mode: "string" }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const operations = pgTable("operations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  cost: numeric("cost", { precision: 100, scale: 2 }).notNull(),
});

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  operationId: integer("operation_id")
    .references(() => operations.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric("amount", { precision: 100, scale: 2 }),
  userBalance: numeric("userBalance", { precision: 100, scale: 2 }),
  operationResponse: text("operation_response"),
  createdDate: timestamp("created_date", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "string" }),
  deletedDate: timestamp("deleted_date", { mode: "string" }),
});
