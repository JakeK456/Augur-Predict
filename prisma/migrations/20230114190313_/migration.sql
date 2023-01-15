/*
  Warnings:

  - You are about to drop the `Prediction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_authorId_fkey";

-- DropTable
DROP TABLE "Prediction";

-- CreateTable
CREATE TABLE "OpenPrediction" (
    "id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "OpenPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClosedPrediction" (
    "id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "startTime" BIGINT NOT NULL,
    "endTime" BIGINT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "ClosedPrediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenPrediction" ADD CONSTRAINT "OpenPrediction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClosedPrediction" ADD CONSTRAINT "ClosedPrediction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
