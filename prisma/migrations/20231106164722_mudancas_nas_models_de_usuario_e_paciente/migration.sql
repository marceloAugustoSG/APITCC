/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `notificacoes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pacienteId]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "notificacoes" DROP CONSTRAINT "notificacoes_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_usuarioId_fkey";

-- DropIndex
DROP INDEX "pacientes_usuarioId_key";

-- AlterTable
ALTER TABLE "notificacoes" DROP COLUMN "usuarioId",
ADD COLUMN     "pacienteId" INTEGER;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "pacienteId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_pacienteId_key" ON "usuarios"("pacienteId");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
