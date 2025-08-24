import dotenv from "dotenv";
import express from "express";
import contactRoutes from "./routes/contactRoute";
import prisma from "./utils/prisma"; // Prisma client singleton

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/", contactRoutes);

const PORT = process.env.PORT || 3000;

// Start server only after DB is ready
async function Server() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL with Prisma");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  }
}

Server();
