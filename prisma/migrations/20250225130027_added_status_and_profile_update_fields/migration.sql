-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isProfileUpdated" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
