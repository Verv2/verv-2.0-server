-- AlterTable
ALTER TABLE "property_listing" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRented" BOOLEAN NOT NULL DEFAULT false;
