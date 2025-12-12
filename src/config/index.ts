import dotenv from "dotenv";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,

  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,

  JWT: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  },

  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
  SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
  SUPER_ADMIN_CONTACT: process.env.SUPER_ADMIN_CONTACT as string,

  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUD_NAME as string,
    API_KEY: process.env.API_KEY as string,
    API_SECRET: process.env.API_SECRET as string,
  },

  STRIPE: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
  },
};