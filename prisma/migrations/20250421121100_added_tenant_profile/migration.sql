/*
  Warnings:

  - Added the required column `age` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budget` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAge` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minAge` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "amenitiesRequired" TEXT[],
ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL,
ADD COLUMN     "lookingIn" TEXT[],
ADD COLUMN     "maxAge" INTEGER NOT NULL,
ADD COLUMN     "minAge" INTEGER NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "availability" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "moveIn" TEXT NOT NULL,
    "minTerm" TEXT NOT NULL,
    "maxTerm" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "household_preference" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "isSmoker" BOOLEAN NOT NULL DEFAULT false,
    "isPetOwner" BOOLEAN NOT NULL DEFAULT false,
    "occupation" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "household_preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "availability_tenantId_key" ON "availability"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "household_preference_tenantId_key" ON "household_preference"("tenantId");

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "household_preference" ADD CONSTRAINT "household_preference_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
