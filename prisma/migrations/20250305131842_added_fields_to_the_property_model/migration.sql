/*
  Warnings:

  - You are about to drop the column `images` on the `propertyListing` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `propertyListing` table. All the data in the column will be lost.
  - You are about to drop the column `propertyName` on the `propertyListing` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `propertyListing` table. All the data in the column will be lost.
  - Added the required column `address` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `furnishingOptions` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyOption` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remoteVideoViewing` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAgreed` to the `propertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `town` to the `propertyListing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('FLAT', 'BEDSIT');

-- CreateEnum
CREATE TYPE "FurnishingOptions" AS ENUM ('FURNISHED', 'UNFURNISHED', 'CHOICE');

-- AlterTable
ALTER TABLE "propertyListing" DROP COLUMN "images",
DROP COLUMN "price",
DROP COLUMN "propertyName",
DROP COLUMN "title",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "furnishingOptions" "FurnishingOptions" NOT NULL,
ADD COLUMN     "houseNumber" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "propertyImages" TEXT[],
ADD COLUMN     "propertyOption" TEXT NOT NULL,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "remoteVideoViewing" BOOLEAN NOT NULL,
ADD COLUMN     "termsAgreed" BOOLEAN NOT NULL,
ADD COLUMN     "town" TEXT NOT NULL,
ADD COLUMN     "viewingDescription" TEXT,
ADD COLUMN     "youtubeUrl" TEXT;
