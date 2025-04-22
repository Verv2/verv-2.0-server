/*
  Warnings:

  - You are about to drop the column `budget` on the `tenant` table. All the data in the column will be lost.
  - Added the required column `maxBudget` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minBudget` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "budget",
ADD COLUMN     "maxBudget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "minBudget" DOUBLE PRECISION NOT NULL;
