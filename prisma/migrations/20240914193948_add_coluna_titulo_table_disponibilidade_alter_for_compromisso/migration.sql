/*
  Warnings:

  - Added the required column `titulo` to the `disponibilidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disponibilidades" ADD COLUMN     "titulo" TEXT NOT NULL;
