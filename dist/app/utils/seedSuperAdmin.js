"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../shared/prisma");
const client_1 = require("@prisma/client");
const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await prisma_1.prisma.user.findUnique({ where: { email: config_1.default.SUPER_ADMIN_EMAIL } });
        if (isSuperAdminExist)
            console.log("Super admin already exists!");
        if (isSuperAdminExist)
            return;
        // console.log("trying to create super admin");
        const hashedPassword = await bcryptjs_1.default.hash(config_1.default.SUPER_ADMIN_PASS, Number(config_1.default.BCRYPT_SALT_ROUND));
        const superAdmin = await prisma_1.prisma.$transaction(async (tnx) => {
            await tnx.user.create({ data: { email: config_1.default.SUPER_ADMIN_EMAIL, password: hashedPassword, role: client_1.UserRole.ADMIN } });
            return await tnx.admin.create({
                data: {
                    name: "Super Admin",
                    address: "RamnagarAddress",
                    contactNumber: config_1.default.SUPER_ADMIN_CONTACT,
                    email: config_1.default.SUPER_ADMIN_EMAIL,
                    gender: client_1.Gender.MALE,
                },
            });
        });
        console.log(superAdmin, "super admin created");
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = seedSuperAdmin;
//# sourceMappingURL=seedSuperAdmin.js.map