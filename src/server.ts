import http, {type Server} from "http";
import app from "./app";
import seedSuperAdmin from "./app/utils/seedSuperAdmin";
import config from "./config";
import {prisma} from "./app/shared/prisma";

let server: Server | null = null;

async function main() {
  server = http.createServer(app);

  server.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`);
  });

  await seedSuperAdmin();
  handleProcessEvents();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

/**
 * Handle system signals and unexpected errors.
 */
function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

/**
 * Gracefully shutdown the server and close database connections.
 * @param {string} signal - The termination signal received.
 */
async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("✅ HTTP server closed.");

      try {
        console.log("Server shutdown complete.");
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
      }

      process.exit(0);
    });
  } else process.exit(0);
}
