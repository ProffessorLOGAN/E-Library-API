import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
};

export const config = Object.freeze(_config);
