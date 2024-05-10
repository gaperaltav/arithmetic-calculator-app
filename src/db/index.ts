import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME!,
});

const db = drizzle(client);

export default db;
