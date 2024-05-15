import { drizzle } from "drizzle-orm/postgres-js";
import pgClient from "./client";

const db = drizzle(pgClient);

export default db;
