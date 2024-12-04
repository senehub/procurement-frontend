// db connection credentials
export const DBCredentials = {
  DB_NAME: process.env.DB_NAME!,
  DB_USER: process.env.DB_USER!,
  DB_HOST: process.env.DB_HOST!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_PORT: parseInt(process.env.DB_PORT!),
} as const;
