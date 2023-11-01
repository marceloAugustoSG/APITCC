import { prisma } from "../services/prisma.js";

class Usuario {
  async CriarUsuario(data) {
    console.log(data)
    const usuario = await prisma.usuario.create({
      data: {
        email: data.email,
        password: data.password,
        regra: data.regra,
        notificacoes: data.notificacoes,
        Paciente: {
          create: {
            nome: data.Paciente.nome,
            tipo: data.Paciente.tipo,
            matricula: data.Paciente.matricula,
            dataNascimento: data.Paciente.dataNascimento,
          },
        },
      },
      select: {
        id: true,
        email: true,
        password: false,
        regra: true,
        Paciente: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            matricula: true,
            consultas: true,
            dataNascimento: true,
          }
        }
      },
    });
    return usuario;
  };
  async ListarTodosUsuarios() {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        regra: true,
        notificacoes: true,
        password: false,
        Paciente: true
      }
    })
    return usuarios;
  };
  async BuscarUsuarioId(id) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        password: false,
        Paciente: true
      },
    });
    return usuario;
  };

  async AtualizarUsuario(id, data) {
    const usuario = await prisma.usuario.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        email: true,
        password: true,
        Paciente: false,
      },
    });
    return usuario;
  };

  async ExcluirUsuario(idUsuario) {

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
}

export default new Usuario();
