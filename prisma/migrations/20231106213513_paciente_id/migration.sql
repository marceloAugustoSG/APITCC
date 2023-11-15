/*
  Warnings:

  - Made the column `pacienteId` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pacienteId_fkey";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "pacienteId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
