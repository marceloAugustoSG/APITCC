/*
  Warnings:

  - The `telefone` column on the `profissionais` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "profissionais" DROP COLUMN "telefone",
ADD COLUMN     "telefone" INTEGER;
