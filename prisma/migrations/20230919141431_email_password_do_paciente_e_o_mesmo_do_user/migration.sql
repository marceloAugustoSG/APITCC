/*
  Warnings:

  - You are about to drop the column `email` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `pacientes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "pacientes_email_key";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "email",
DROP COLUMN "password";
