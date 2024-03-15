/*
  Warnings:

  - Made the column `data` on table `consultas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "consultas" ALTER COLUMN "data" SET NOT NULL;
