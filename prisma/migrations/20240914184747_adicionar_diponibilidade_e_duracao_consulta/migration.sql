-- CreateTable
CREATE TABLE "disponibilidades" (
    "id" SERIAL NOT NULL,
    "diaDaSemana" TEXT NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "profissionalId" INTEGER NOT NULL,

    CONSTRAINT "disponibilidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disponibilidades" ADD CONSTRAINT "disponibilidades_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
