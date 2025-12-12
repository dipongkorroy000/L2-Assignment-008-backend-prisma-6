"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const seedSuperAdmin_1 = __importDefault(require("./app/utils/seedSuperAdmin"));
const config_1 = __importDefault(require("./config"));
const prisma_1 = require("./app/shared/prisma");
let server = null;
async function main() {
    server = http_1.default.createServer(app_1.default);
    server.listen(config_1.default.PORT, () => {
        console.log(`Example app listening on port ${config_1.default.PORT}`);
    });
    await (0, seedSuperAdmin_1.default)();
    handleProcessEvents();
}
main()
    .then(async () => {
    await prisma_1.prisma.$disconnect();
})
    .catch(async (err) => {
    console.error(err);
    await prisma_1.prisma.$disconnect();
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
async function gracefulShutdown(signal) {
    console.warn(`🔄 Received ${signal}, shutting down gracefully...`);
    if (server) {
        server.close(async () => {
            console.log("✅ HTTP server closed.");
            try {
                console.log("Server shutdown complete.");
            }
            catch (error) {
                console.error("❌ Error during shutdown:", error);
            }
            process.exit(0);
        });
    }
    else
        process.exit(0);
}
//# sourceMappingURL=server.js.map