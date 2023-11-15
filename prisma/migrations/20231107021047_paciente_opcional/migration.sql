/*
  Warnings:

  - You are about to drop the column `pacienteId` on the `usuarios` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "usuarios_pacienteId_key";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "pacienteId";
