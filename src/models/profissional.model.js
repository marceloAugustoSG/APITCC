import { prisma } from "../services/prisma.js";

class Profissional {


  async CriarProfissional(data) {
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



  async ListarTodosProfissionais() {
    const profissionais = await prisma.profissional.findMany({
      select: {
        id: true,
        nome: true,
        especialidade: true,
      },
    });

    return profissionais;
  };

  async BuscarProfissionalId(id) {
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

  async AtualizarProfissional(id, data) {
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

  async ExcluirProfissional(id) {
    await prisma.profissional.delete({
      where: {
        id,
      },
    });
    return;
  };

}

export default new Profissional();







