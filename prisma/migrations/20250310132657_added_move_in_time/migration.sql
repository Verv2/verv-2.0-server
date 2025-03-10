/*
  Warnings:

  - Added the required column `moveInDate` to the `property_listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property_listing" ADD COLUMN     "moveInDate" TEXT NOT NULL;
