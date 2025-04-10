/*
  Warnings:

  - You are about to drop the column `sellingOption` on the `property_listing` table. All the data in the column will be lost.
  - Added the required column `planId` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyFor` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `property_listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyFor" AS ENUM ('RENT', 'SELL');

-- AlterTable
ALTER TABLE "property_listing" DROP COLUMN "sellingOption",
ADD COLUMN     "planId" TEXT NOT NULL,
ADD COLUMN     "propertyFor" "PropertyFor" NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SellingOptions";
