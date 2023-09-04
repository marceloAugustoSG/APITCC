import { prisma } from "../services/prisma";

const consultas = await prisma.consulta.findMany();

const datasConsultasFormatadas = consultas.map((consulta) => {
  const dataFormatada = consulta.data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return {
    ...consulta,
    dataFormatada,
  };
});

console.log(datasConsultasFormatadas);
