/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pacienteId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_usuarioId_key" ON "pacientes"("usuarioId");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
