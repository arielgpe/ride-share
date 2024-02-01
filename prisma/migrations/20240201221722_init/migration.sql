-- CreateEnum
CREATE TYPE "Status" AS ENUM ('open', 'ongoing', 'completed', 'canceled');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DRIVER', 'RIDER');

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER,
    "distance" DECIMAL(9,2) NOT NULL,
    "cost" INTEGER NOT NULL,
    "driverPay" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "originLngLat" DECIMAL(9,2)[],
    "destination" TEXT NOT NULL,
    "destinationLngLat" DECIMAL(9,2)[],
    "status" "Status" NOT NULL DEFAULT 'open',

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'RIDER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
