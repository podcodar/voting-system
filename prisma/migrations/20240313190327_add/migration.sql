/*
  Warnings:

  - Added the required column `day` to the `Election` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "day" TIMESTAMP(3) NOT NULL;
