/*
  Warnings:

  - Added the required column `data_nascimento` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "data_nascimento" TEXT NOT NULL;
