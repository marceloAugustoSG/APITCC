-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "pacienteId" INTEGER;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
