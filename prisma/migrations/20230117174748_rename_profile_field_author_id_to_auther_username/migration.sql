/*
  Warnings:

  - You are about to drop the column `authorId` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `authorUsername` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_authorId_fkey";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "authorId",
ADD COLUMN     "authorUsername" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
