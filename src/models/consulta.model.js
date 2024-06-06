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
        respostas: true,
      },
    });
    return consulta;
  }
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
            usuarioId: true,
          },
        },
        Profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return consultas;
  }

  async compareConsulta(id) {
    const consulta = await prisma.consulta.findUnique({
      where: {
        id,
      },
      select: {
        status: true,
        data: true,
        data_solicitacao: true,
        id: true,
        observacao: true,
        pacienteId: true,
        profissionalId: true,
      },
    });
    return consulta;
  }

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
        respostas: true,
      },
    });
    return consulta;
  }

  async AtualizarConsulta(id, data) {
    const consulta = await prisma.consulta.update({
      where: {
        id,
      },
      data,
      select: {
        status: true,
        data: true,
        data_solicitacao: true,
        id: true,
        observacao: true,
        pacienteId: true,
        profissionalId: true,
      },
    });
    return consulta;
  }

  async ExcluirConsulta(id) {
    await prisma.consulta.delete({
      where: {
        id,
      },
    });
    return;
  }


  async ExcluirConsultasProfissional(id) {

    await prisma.consulta.deleteMany({
      where: {
        profissionalId: id
      }

    })
    return;


  }

  async deleteAll() {
    await prisma.consulta.deleteMany();
    await prisma.$queryRaw('ALTER SEQUENCE "Consultas_id_seq" RESTART WITH 1');
    return;
  }

  async consultasPaciente(idPaciente) {
    const consultas = await prisma.consulta.findMany({
      where: {
        pacienteId: idPaciente,
      },
      select: {
        data_solicitacao: true,
        status: true,
        observacao: true,
        pacienteId: true,
        servico: true,
        data: true,
      },
    });
    console.log(consultas);
    return consultas;
  }
}
export default new Consulta();
