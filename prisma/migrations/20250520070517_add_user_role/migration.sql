-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
