/*
  Warnings:

  - You are about to drop the column `needPasswordChange` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'LANDLORD', 'TENANT');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "needPasswordChange",
ADD COLUMN     "role" "UserRole" NOT NULL;
