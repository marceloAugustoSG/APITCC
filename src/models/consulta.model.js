import { prisma } from "../services/prisma.js";



class Consulta {
  async create(data) {
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
        data_solicitacao: true
      },
    });

    return consulta;
  };
  async getAll() {

    const consultas = await prisma.consulta.findMany({
      select: {
        id: true,
        data: true,
        status: true,
        observacao: true,
        servico: true,
        profissionalId: true,
        data_solicitacao: true,
        Paciente: {
          select: {
            nome: true
          }
        },
        Profissional: {
          select: {
            nome: true,

          }
        }
      },
    });
    return consultas;
  };

  async getById(id) {


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
        data_solicitacao: true,
        Paciente: true,
        Profissional: true,
        servico: true
      },
    });
    return consulta;
  };

  async update(id, data) {
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

  async delete(id) {
    await prisma.consulta.delete({
      where: {
        id,
      },
    });
    return;
  };

  async deleteAll() {
    await prisma.consulta.deleteMany();
    await prisma.$queryRaw('ALTER SEQUENCE "Consultas_id_seq" RESTART WITH 1');
    return;
  };
}
export default new Consulta();
