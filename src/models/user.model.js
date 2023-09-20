import { prisma } from "../services/prisma.js";


export const createUsuario = async (data) => {
  const usuario = await prisma.usuario.create({
    data: {
      email: data.email,
      password: data.password,
      Paciente: {
        create: {
          nome: data.Paciente.nome,
          tipo: data.Paciente.tipo,
          matricula: data.Paciente.matricula,
        },
      },
    },
    select: {
      id: true,
      email: true,
      password: true,
      Paciente: {
        select: {
          id: true,
          consultas: true
        }
      }
    },
  });

  return usuario;
};



export const getAll = async () => {
  const usuarios = await prisma.usuario.findMany({
    select: {
      id: true,
      email: true,
      password: true,
      Paciente: {
        select: {
          id: true,
          consultas: true
        }
      }
    }
  })

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
      password: true,
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
      password: true,
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
