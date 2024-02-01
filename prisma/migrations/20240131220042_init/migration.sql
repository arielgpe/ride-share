-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DRIVER', 'RIDER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DRIVER';
