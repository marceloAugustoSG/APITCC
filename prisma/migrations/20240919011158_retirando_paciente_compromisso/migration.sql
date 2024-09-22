/*
  Warnings:

  - You are about to drop the column `pacienteId` on the `compromissos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "compromissos" DROP CONSTRAINT "compromissos_pacienteId_fkey";

-- AlterTable
ALTER TABLE "compromissos" DROP COLUMN "pacienteId";
