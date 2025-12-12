import config from "../../config";

import bcrypt from "bcryptjs";
import {prisma} from "../shared/prisma";
import {Gender, UserRole} from "@prisma/client";

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findUnique({where: {email: config.SUPER_ADMIN_EMAIL}});

    if (isSuperAdminExist) console.log("Super admin already exists!");
    if (isSuperAdminExist) return;

    // console.log("trying to create super admin");
    const hashedPassword = await bcrypt.hash(config.SUPER_ADMIN_PASS, Number(config.BCRYPT_SALT_ROUND));

    const superAdmin = await prisma.$transaction(async (tnx) => {
      await tnx.user.create({data: {email: config.SUPER_ADMIN_EMAIL, password: hashedPassword, role: UserRole.ADMIN}});

      return await tnx.admin.create({
        data: {
          name: "Super Admin",
          address: "RamnagarAddress",
          contactNumber: config.SUPER_ADMIN_CONTACT,
          email: config.SUPER_ADMIN_EMAIL,
          gender: Gender.MALE,
        },
      });
    });

    console.log(superAdmin, "super admin created");
  } catch (err) {
    console.log(err);
  }
};

export default seedSuperAdmin;
