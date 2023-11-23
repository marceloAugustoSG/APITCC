import { prisma } from "../services/prisma.js";

class Usuario {

  async CriarUsuario(data) {
    const usuario = await prisma.usuario.create({
      data: {
        email: data.email,
        password: data.password,
        regra: data.regra
      }
      , select: {
        email: true,
        password: false,
        regra: true,

      }
    })

    return usuario

  }


  async CriarUsuarioPaciente(data) {
    console.log(data)
    const usuario = await prisma.usuario.create({
      data: {
        email: data.email,
        password: data.password,
        regra: data.regra,
        paciente: {
          create: {
            nome: data.paciente.nome,
            tipo: data.paciente.tipo,
            matricula: data.paciente.matricula,
            dataNascimento: data.paciente.dataNascimento,
            telefone: data.paciente.telefone
          }
        }
      },
      select: {
        email: true,
        password: false,
        regra: true,
        paciente: true
      }
    });
    return usuario;
  };
  async ListarTodosUsuarios() {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        regra: true,
        paciente: true
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
        paciente: {
          select:{
            id:true,
            nome:true,
            tipo:true,
            matricula:true,
            telefone:true,
            dataNascimento:true,
            notificacoes:true,
            consultas:true,
          }
        }
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
        regra: true,
        paciente: false,
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
        paciente: true
      }
    })

    // se o usuario nao conter o paciente, ele é excluido
    if (usuario.paciente === null) {
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
