-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "designation" DROP DEFAULT,
ALTER COLUMN "designation" SET DATA TYPE TEXT;
