import dotenv, { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "./schema";

//TODO: set for diffents envs
dotenv.config({ path: __dirname + "/../../.env.local" });

const initialUsers: (typeof users.$inferInsert)[] = [
  {
   name: 'root user',
  email:"root@gmail.com",
  emailVerified: new Date(),
  image: 'https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg',
  password: '1234'
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
