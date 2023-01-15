/*
  Warnings:

  - Added the required column `endTime` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "isFinalized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startTime" TEXT NOT NULL;
