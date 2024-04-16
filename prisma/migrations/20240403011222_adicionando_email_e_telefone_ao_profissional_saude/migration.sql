/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `profissionais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `profissionais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profissionais" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_email_key" ON "profissionais"("email");
