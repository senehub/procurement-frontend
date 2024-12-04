import { defineConfig } from "drizzle-kit";
import { DBCredentials } from "./lib/db/config";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./lib/db/schema",
  dbCredentials: {
    host: DBCredentials.DB_HOST,
    user: DBCredentials.DB_USER,
    port: DBCredentials.DB_PORT,
    database: DBCredentials.DB_NAME,
    password: DBCredentials.DB_PASSWORD,
  },
});
