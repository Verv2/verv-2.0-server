/*
  Warnings:

  - Added the required column `moveInDate` to the `rent_now_tenant_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rent_now_tenant_info" ADD COLUMN     "moveInDate" TEXT NOT NULL;
