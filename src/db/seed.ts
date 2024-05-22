import dotenv, { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { operations, users } from "./schema";
import pgClient from "./client";

//TODO: set for diffents envs
dotenv.config({ path: __dirname + "/../../.env.local" });

const initialUsers: (typeof users.$inferInsert)[] = [
  {
   name: 'root user',
  email:"root@gmail.com",
  emailVerified: new Date(),
  image: 'https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg',
  password: '1234',
  balance: '1500'
  },
];

const initialOperations: (typeof operations.$inferInsert)[] = [
  {
    type: "addition",
    cost: '3',
  },
  {
    type:  "subtraction",
    cost: '4',
  },
  {
    type: "multiplication",
    cost: '2',
  },
  {
    type: "division",
    cost: "5",
  },
  {
    type: "square_root",
    cost: "10",
  },
  {
    type: "random_string",
    cost: "12",
  },
];

const mainSeed = async () => {
  const { ENV } = process.env;
  const pgClient: postgres.Sql<{}> =
    ENV === "develop"
      ? postgres(process.env.DATABASE_URL!)
      : postgres({
          host: process.env.DB_HOST!,
          user: process.env.DB_USER!,
          password: process.env.DB_PASSWORD!,
          port: parseInt(process.env.DB_PORT!),
          database: process.env.DB_NAME!,
        });

  const database = drizzle(pgClient);

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
