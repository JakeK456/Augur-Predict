/*
  Warnings:

  - Changed the type of `endTime` on the `Prediction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTime` on the `Prediction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "endTime",
ADD COLUMN     "endTime" BIGINT NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" BIGINT NOT NULL;
