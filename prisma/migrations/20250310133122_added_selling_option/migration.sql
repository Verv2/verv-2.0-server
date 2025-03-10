/*
  Warnings:

  - Added the required column `sellingOption` to the `property_listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SellingOptions" AS ENUM ('RENT', 'SELL');

-- AlterTable
ALTER TABLE "property_listing" ADD COLUMN     "sellingOption" "SellingOptions" NOT NULL;
