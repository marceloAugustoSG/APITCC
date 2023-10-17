/*
  Warnings:

  - You are about to drop the column `solicitado` on the `consultas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "consultas" DROP COLUMN "solicitado",
ADD COLUMN     "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
