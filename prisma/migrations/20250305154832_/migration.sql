/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `propertyListing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `propertyListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "propertyListing" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "propertyListing_email_key" ON "propertyListing"("email");
