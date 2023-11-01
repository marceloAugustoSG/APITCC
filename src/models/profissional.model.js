import { prisma } from "../services/prisma.js";

export const CriarProfissional = async (data) => {
  const profissional = await prisma.profissional.create({
    data,
    select: {
      id: true,
      nome: true,
      especialidade: true,
      consultas: true,
    },
  });

  return profissional;
};

export const ListarTodosProfissionais = async () => {
  const profissionais = await prisma.profissional.findMany({
    select: {
      id: true,
      nome: true,
      especialidade: true,
    },
  });

  return profissionais;
};

export const BuscarProfissionalId = async (id) => {
  const profissional = await prisma.profissional.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nome: true,
      especialidade: true,
      consultas: true,
    },
  });
  return profissional;
};

export const AtualizarProfissional = async (id, data) => {
  const profissional = await prisma.profissional.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      nome: true,
      especialidade: true,
      consultas: true,
    },
  });
  return profissional;
};

export const ExcluirProfissional = async (id) => {
  await prisma.profissional.delete({
    where: {
      id,
    },
  });
  return;
};
