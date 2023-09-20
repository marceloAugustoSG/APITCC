/*
  Warnings:

  - You are about to drop the column `userId` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `pacienteId` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_userId_fkey";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "userId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "pacienteId";

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_usuarioId_key" ON "pacientes"("usuarioId");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
