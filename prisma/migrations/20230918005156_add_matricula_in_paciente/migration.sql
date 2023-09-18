/*
  Warnings:

  - Added the required column `matricula` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "matricula" TEXT NOT NULL;
