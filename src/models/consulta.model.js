import { prisma } from "../services/prisma.js";

class Consulta {
  async CriarConsulta(data) {
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
        data_solicitacao: true,
        respostas: true
      },
    });
    return consulta;
  };
  async ListarTodasConsultas() {
    const consultas = await prisma.consulta.findMany({
      select: {
        id: true,
        data: true,
        status: true,
        observacao: true,
        servico: true,
        profissionalId: true,
        data_solicitacao: true,
        pacienteId: true,
        respostas: true,
        Paciente: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            matricula: true,
            dataNascimento: true,
            telefone: true,
            usuarioId: true
          }
        },
        Profissional: {
          select: {
            id: true,
            nome: true,
          }
        }
      },
    });
    return consultas;
  };

  async BuscarConsultaId(id) {
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
        servico: true,
        respostas: true
      },
    });
    return consulta;
  };


  async AtualizarConsulta(id, data) {
    const consulta = await prisma.consulta.update({
      where: {
        id,
      },
      data,
      select: {
        data: true,
        data_solicitacao: true,
        id: true,
        observacao: true,
        pacienteId: true,
        profissionalId: true

      },
    });
    return consulta;
  };

  async ExcluirConsulta(id) {
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

  async consultasHoje() {

    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const consultasHoje = await prisma.consulta.findMany({
        where: {

        }
      })
    } catch (e) {


    }


  }
}
export default new Consulta();
