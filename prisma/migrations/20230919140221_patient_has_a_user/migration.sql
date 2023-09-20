/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `usuarioId` on table `pacientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pacientes" ALTER COLUMN "usuarioId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_usuarioId_key" ON "pacientes"("usuarioId");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
