// database.ts
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function connectPostgresSQL() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
