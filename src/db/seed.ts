import dotenv, { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { operations, users } from "./schema";
import drizzleConfig from '../../drizzle.config'

//TODO: set for diffents envs
dotenv.config({ path: __dirname + "/../../.env.local" });

const initialUsers: (typeof users.$inferInsert)[] = [
  {
    userName: "gabriel",
    password: "test",
  },
];

const initialOperations: (typeof operations.$inferInsert)[] = [
  {
    type: 1,
    name: "addition",
    cost: 3,
  },
  {
    type: 2,
    name: "subtraction",
    cost: 4,
  },
  {
    type: 3,
    name: "multiplication",
    cost: 2,
  },
  {
    type: 4,
    name: "division",
    cost: 5,
  },
  {
    type: 5,
    name: "square_root",
    cost: 10,
  },
  {
    type: 6,
    name: "random_string",
    cost: 12,
  },
];

const mainSeed = async () => {
  const client = postgres({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME!,
  });
  const database = drizzle(client);

  await database.insert(users).values(initialUsers);
  await database.insert(operations).values(initialOperations);
};

mainSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding complete!");
    process.exit(0);
  });
