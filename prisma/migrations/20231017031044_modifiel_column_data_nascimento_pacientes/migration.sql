/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `dataNascimento` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "data_nascimento",
ADD COLUMN     "dataNascimento" TEXT NOT NULL;
