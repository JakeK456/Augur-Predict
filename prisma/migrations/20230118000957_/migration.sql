/*
  Warnings:

  - You are about to drop the column `profileUsername` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `username` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_profileUsername_fkey";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "profileUsername",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_username_fkey" FOREIGN KEY ("username") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
