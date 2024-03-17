/*
  Warnings:

  - You are about to drop the column `electionDay` on the `Election` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ElectionStatus" AS ENUM ('NOT_STARTED', 'ONGOING', 'FINISHED');

-- AlterTable
ALTER TABLE "Election" DROP COLUMN "electionDay",
ADD COLUMN     "status" "ElectionStatus" NOT NULL DEFAULT 'NOT_STARTED';
