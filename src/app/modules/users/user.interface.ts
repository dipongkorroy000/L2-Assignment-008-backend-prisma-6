import { Gender, UserRole } from "@prisma/client";


export type createTouristPayload = {
  password: string;
  tourist: {name: string; email: string; profilePhoto?: string; address: string; contactNumber: string, gender: Gender};
};

export type createGuidePayload = {
  password: string;
  guide: {name: string; email: string; profilePhoto?: string; address: string; contactNumber: string, gender: Gender, role: UserRole};
};

export type createAdminPayload = {
  password: string;
  admin: {name: string; email: string; profilePhoto?: string; address: string; contactNumber: string, gender: Gender, role: UserRole};
};