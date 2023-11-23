/*
  Warnings:

  - You are about to drop the column `respostas` on the `pacientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "consultas" ADD COLUMN     "respostas" TEXT;

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "respostas";
