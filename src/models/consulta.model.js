import { prisma } from "../services/prisma.js";

export const createConsulta = async (data) => {
  const consulta = await prisma.consulta.create({
    data,

    select: {
      id: true,
      data: true,
      status: true,
      observacao: true,
      servico: true,
      pacienteId: true,
      profissionalId: true,
    },
  });

  return consulta;
};

export const getAll = async () => {
  const consultas = await prisma.consulta.findMany({
    select: {
      id: true,
      data: true,
      status: true,
      observacao: true,
      pacienteId: true,
      profissionalId: true,
    },
  });
  return consultas;
};

export const getById = async (id) => {
  const consulta = await prisma.consulta.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      data: true,
      status: true,
      observacao: true,
      pacienteId: true,
      profissionalId: true,
    },
  });
  return consulta;
};

export const updateConsulta = async (id, data) => {
  const consulta = await prisma.consulta.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      data: true,
      status: true,
      observacao: true,
      profissionalId: true,
    },
  });
  return consulta;
};

export const deletarConsulta = async (id) => {
  await prisma.consulta.delete({
    where: {
      id,
    },
  });
  return;
};

export const deleteAllConsultas = async () => {
  await prisma.consulta.deleteMany();
  await prisma.$queryRaw('ALTER SEQUENCE "Consultas_id_seq" RESTART WITH 1');
  return;
};
