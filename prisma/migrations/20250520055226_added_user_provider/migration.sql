-- CreateEnum
CREATE TYPE "UserProviders" AS ENUM ('local', 'google', 'facebook');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "UserProviders" NOT NULL DEFAULT 'local';
