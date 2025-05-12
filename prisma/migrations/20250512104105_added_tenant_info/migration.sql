-- CreateTable
CREATE TABLE "rent_now_tenant_info" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rent_now_tenant_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rent_now_tenant_info_email_key" ON "rent_now_tenant_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rent_now_tenant_info_phoneNumber_key" ON "rent_now_tenant_info"("phoneNumber");

-- AddForeignKey
ALTER TABLE "rent_now_tenant_info" ADD CONSTRAINT "rent_now_tenant_info_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
