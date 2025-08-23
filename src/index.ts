import dotenv from "dotenv";
dotenv.config(); 

import { connectPostgresSQL } from "./database";

async function startServer() {
  await connectPostgresSQL();
}
startServer().catch(console.error);
