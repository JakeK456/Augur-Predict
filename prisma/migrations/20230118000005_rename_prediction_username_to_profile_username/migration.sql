/*
  Warnings:

  - You are about to drop the column `username` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `profileUsername` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_username_fkey";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "username",
ADD COLUMN     "profileUsername" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_profileUsername_fkey" FOREIGN KEY ("profileUsername") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
