import { prisma } from "../services/prisma";

export const createUser = async (data) => {
  const usuario = await prisma.usuario.create({
    data,
    select: {
      id: true,
      email: true,
      senha: true,
    },
  });
  return usuario;
};

export const getAll = async () => {
  const usuarios = await prisma.usuario.findMany({
    select: {
      id: true,
      email: true,
      senha: true,
    },
  });

  return usuarios;
};

export const getById = async (id) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      senha: true,
    },
  });
  return usuario;
};

export const updateUsuario = async (id, data) => {
  const usuario = await prisma.usuario.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      email: true,
      senha: true,
    },
  });
  return usuario;
};

export const deletarUsuario = async (id) => {
  await prisma.usuario.delete({
    where: {
      id,
    },
  });
  return;
};
