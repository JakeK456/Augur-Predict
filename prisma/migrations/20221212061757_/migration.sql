/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
