/*
  Warnings:

  - You are about to drop the `disponibilidades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "disponibilidades" DROP CONSTRAINT "disponibilidades_profissionalId_fkey";

-- DropTable
DROP TABLE "disponibilidades";

-- CreateTable
CREATE TABLE "compromissos" (
    "id" SERIAL NOT NULL,
    "tituloCompromisso" TEXT NOT NULL,
    "dataCompromisso" TIMESTAMP(3) NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "pacienteId" INTEGER,

    CONSTRAINT "compromissos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "compromissos" ADD CONSTRAINT "compromissos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compromissos" ADD CONSTRAINT "compromissos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
