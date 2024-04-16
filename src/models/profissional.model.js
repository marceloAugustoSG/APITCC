import { prisma } from "../services/prisma.js";

class Profissional {
  async CriarProfissional(data) {
    const profissional = await prisma.profissionalSaude.create({
      data,
      select: {
        id: true,
        nome: true,
        especialidade: true,
        consultas: true,
        email: true,
        telefone: true,
      },
    });

    return profissional;
  }

  async ListarTodosProfissionais() {
    const profissionais = await prisma.profissionalSaude.findMany({
      select: {
        id: true,
        nome: true,
        especialidade: true,
        email: true,
        telefone: true,
      },
    });

    return profissionais;
  }

  async BuscarProfissionalId(id) {
    const profissional = await prisma.profissionalSaude.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        especialidade: true,
        email: true,
        telefone: true,
        consultas: true,
      },
    });
    return profissional;
  }

  async BuscarProfissionalEmail(email) {
    const profissional = await prisma.profissionalSaude.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        nome: true,
        especialidade: true,
        email: true,
        telefone: true,
        consultas: true,
      },
    });
    return profissional;
  }

  async AtualizarProfissional(id, data) {
    const profissional = await prisma.profissionalSaude.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        nome: true,
        especialidade: true,
        consultas: true,
        email: true,
        telefone: true,
      },
    });
    return profissional;
  }

  async ExcluirProfissional(id) {
    await prisma.profissionalSaude.delete({
      where: {
        id,
      },
    });
    return;
  }
}

export default new Profissional();
