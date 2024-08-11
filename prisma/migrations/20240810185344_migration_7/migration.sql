-- AlterTable
ALTER TABLE "File" ADD COLUMN     "size" BIGINT NOT NULL DEFAULT 2469298;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
