/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `consultas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "consultas" DROP COLUMN "criadoEm",
ADD COLUMN     "solicitado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
