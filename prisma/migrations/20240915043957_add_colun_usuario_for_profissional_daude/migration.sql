/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId]` on the table `profissionais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `profissionais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profissionais" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_usuarioId_key" ON "profissionais"("usuarioId");

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
