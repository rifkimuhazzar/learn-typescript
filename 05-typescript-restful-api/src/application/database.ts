import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

prismaClient.$on("query", (event) => void logger.info(event));
prismaClient.$on("info", (event) => void logger.info(event));
prismaClient.$on("warn", (event) => void logger.warn(event));
prismaClient.$on("error", (event) => void logger.error(event));
