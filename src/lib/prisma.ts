// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

// Create a PrismaClient instance
let prisma: PrismaClient;

// Initialize PrismaClient depending on the environment
if (process.env.NODE_ENV === "production") {
  // In production, create a new instance of PrismaClient
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to avoid creating multiple instances
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  // Create a new instance only if it doesn't already exist
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}

// Export the PrismaClient instance
export default prisma;
