/*
  Warnings:

  - Added the required column `billsIncluded` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositAmount` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dssIncomeAccepted` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familiesAllowed` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fireplace` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardenAccess` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maximumTenancy` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumTenancy` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRent` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petsAllowed` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smokersAllowed` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAllowed` to the `property_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyRent` to the `property_listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property_listing" ADD COLUMN     "billsIncluded" BOOLEAN NOT NULL,
ADD COLUMN     "depositAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dssIncomeAccepted" BOOLEAN NOT NULL,
ADD COLUMN     "familiesAllowed" BOOLEAN NOT NULL,
ADD COLUMN     "fireplace" BOOLEAN NOT NULL,
ADD COLUMN     "gardenAccess" BOOLEAN NOT NULL,
ADD COLUMN     "maximumTenancy" INTEGER NOT NULL,
ADD COLUMN     "minimumTenancy" INTEGER NOT NULL,
ADD COLUMN     "monthlyRent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "parking" BOOLEAN NOT NULL,
ADD COLUMN     "petsAllowed" BOOLEAN NOT NULL,
ADD COLUMN     "smokersAllowed" BOOLEAN NOT NULL,
ADD COLUMN     "studentAllowed" BOOLEAN NOT NULL,
ADD COLUMN     "weeklyRent" DOUBLE PRECISION NOT NULL;
