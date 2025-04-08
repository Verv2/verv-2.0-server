/*
  Warnings:

  - You are about to drop the `TemporaryProperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemporaryProperty" DROP CONSTRAINT "TemporaryProperty_userId_fkey";

-- DropTable
DROP TABLE "TemporaryProperty";

-- CreateTable
CREATE TABLE "temporary_property" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temporary_property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "temporary_property_userId_key" ON "temporary_property"("userId");

-- AddForeignKey
ALTER TABLE "temporary_property" ADD CONSTRAINT "temporary_property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
