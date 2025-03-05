/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `landlord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `landlord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_email_fkey";

-- DropForeignKey
ALTER TABLE "landlord" DROP CONSTRAINT "landlord_email_fkey";

-- DropForeignKey
ALTER TABLE "tenant" DROP CONSTRAINT "tenant_email_fkey";

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "landlord" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "propertyListing" (
    "id" TEXT NOT NULL,
    "propertyName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "landlordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertyListing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_userId_key" ON "admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "landlord_userId_key" ON "landlord"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_userId_key" ON "tenant"("userId");

-- AddForeignKey
ALTER TABLE "landlord" ADD CONSTRAINT "landlord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyListing" ADD CONSTRAINT "propertyListing_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "landlord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
