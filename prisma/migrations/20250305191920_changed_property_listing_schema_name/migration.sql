/*
  Warnings:

  - You are about to drop the `propertyListing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "propertyListing" DROP CONSTRAINT "propertyListing_landlordId_fkey";

-- DropTable
DROP TABLE "propertyListing";

-- CreateTable
CREATE TABLE "property_listing" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyOption" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "furnishingOptions" "FurnishingOptions" NOT NULL,
    "town" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyImages" TEXT[],
    "remoteVideoViewing" BOOLEAN NOT NULL,
    "viewingDescription" TEXT,
    "youtubeUrl" TEXT,
    "termsAgreed" BOOLEAN NOT NULL,
    "landlordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "property_listing" ADD CONSTRAINT "property_listing_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "landlord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
