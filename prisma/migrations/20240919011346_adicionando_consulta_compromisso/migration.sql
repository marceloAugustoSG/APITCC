-- AlterTable
ALTER TABLE "compromissos" ADD COLUMN     "consultaId" INTEGER;

-- AddForeignKey
ALTER TABLE "compromissos" ADD CONSTRAINT "compromissos_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "consultas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
