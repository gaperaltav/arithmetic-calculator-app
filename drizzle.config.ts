
import dotenv from "dotenv";
import type { Config } from 'drizzle-kit';

dotenv.config({ path: ".env.local" });

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME!,
  },
} satisfies Config;