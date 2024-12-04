import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DBCredentials } from "../config";

import * as schema from "../schema";

const client = postgres({
  host: DBCredentials.DB_HOST,
  user: DBCredentials.DB_USER,
  port: DBCredentials.DB_PORT,
  database: DBCredentials.DB_NAME,
  password: DBCredentials.DB_PASSWORD,
});

const DB = drizzle({ client, schema });

export default DB;
