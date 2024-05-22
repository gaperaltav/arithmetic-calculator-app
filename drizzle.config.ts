
import dotenv from "dotenv";
import type { Config } from 'drizzle-kit';

dotenv.config({ path: ".env.local" });

const { ENV } = process.env

const dbCredentials = ENV == 'develop' ? {
  connectionString: process.env.DATABASE_URL!
} : {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME!,
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials,
} satisfies Config;