/*
  Warnings:

  - Made the column `profilePhoto` on table `landlord` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "landlord" ADD COLUMN     "languages" TEXT[],
ALTER COLUMN "profilePhoto" SET NOT NULL;
