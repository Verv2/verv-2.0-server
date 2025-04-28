-- AlterTable
ALTER TABLE "landlord" ALTER COLUMN "profilePhoto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
