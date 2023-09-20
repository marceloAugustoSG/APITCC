/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `pacientes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_usuarioId_fkey";

-- DropIndex
DROP INDEX "pacientes_usuarioId_key";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "usuarioId";
