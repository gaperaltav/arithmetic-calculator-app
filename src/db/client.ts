import postgres from "postgres";

const pgClient = postgres({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME!,
  });

  export default pgClient;