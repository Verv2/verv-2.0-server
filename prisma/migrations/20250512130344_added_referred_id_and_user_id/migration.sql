/*
  Warnings:

  - You are about to drop the column `tenantId` on the `rent_now_tenant_info` table. All the data in the column will be lost.
  - Added the required column `referredByTenantId` to the `rent_now_tenant_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `rent_now_tenant_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rent_now_tenant_info" DROP CONSTRAINT "rent_now_tenant_info_tenantId_fkey";

-- AlterTable
ALTER TABLE "rent_now_tenant_info" DROP COLUMN "tenantId",
ADD COLUMN     "referredByTenantId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "rent_now_tenant_info" ADD CONSTRAINT "rent_now_tenant_info_referredByTenantId_fkey" FOREIGN KEY ("referredByTenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
