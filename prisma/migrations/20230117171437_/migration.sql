/*
  Warnings:

  - You are about to drop the column `pinnedPredictions` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ClosedPrediction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenPrediction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClosedPrediction" DROP CONSTRAINT "ClosedPrediction_authorId_fkey";

-- DropForeignKey
ALTER TABLE "OpenPrediction" DROP CONSTRAINT "OpenPrediction_authorId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "pinnedPredictions";

-- DropTable
DROP TABLE "ClosedPrediction";

-- DropTable
DROP TABLE "OpenPrediction";

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "pinned" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
