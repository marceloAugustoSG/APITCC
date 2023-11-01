/*
  Warnings:

  - You are about to drop the column `pacienteId` on the `notificacoes` table. All the data in the column will be lost.
  - Changed the type of `dataNascimento` on the `pacientes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "notificacoes" DROP CONSTRAINT "notificacoes_pacienteId_fkey";

-- AlterTable
ALTER TABLE "notificacoes" DROP COLUMN "pacienteId",
ADD COLUMN     "usuarioId" INTEGER;

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "dataNascimento",
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
