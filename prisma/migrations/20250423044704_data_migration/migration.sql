-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "tenant" ALTER COLUMN "isAvailable" SET DEFAULT false;
