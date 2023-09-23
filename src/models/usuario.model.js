import { prisma } from "../services/prisma.js";
import { deletarPaciente } from "./paciente.model.js";


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
      password: false,
      Paciente: {
        select: {
          id: true,
          nome: true,
          tipo: true,
          matricula: true,
          usuarioId: true
        }
      }
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

export const deletarUsuario = async (idUsuario) => {

  //Encontrando o usuario
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }, select: {
      Paciente: true
    }
  })

  // se o usuario nao conter o paciente, ele é excluido
  if (usuario.Paciente === null) {
    await prisma.usuario.delete({
      where: {
        id: idUsuario
      }
    })

    // senão , o paciente deve ser excluido primeiro por conta da chave estrangeira

  } else {
    await prisma.paciente.delete({
      where: {
        usuarioId: idUsuario
      }
    })

    //assim sendo , aqui o usuário é excluido
    await prisma.usuario.delete({
      where: {
        id: idUsuario
      }
    })
  }
  return;
};
