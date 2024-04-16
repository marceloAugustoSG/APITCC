import { prisma } from "../services/prisma.js";

class Paciente {
  // async CriarPaciente(data) {
  //     console.log(data)
  //     try {
  //         const paciente = await prisma.paciente.create({
  //             data: {
  //                 nome: data.nome,
  //                 tipo: data.tipo,
  //                 matricula: data.matricula,
  //                 dataNascimento: data.dataNascimento,
  //                 telefone: data.telefone,
  //                 Usuario: {
  //                     connect: { id: data.usuarioId },
  //                 },
  //             },
  //             select: {
  //                 id: true,
  //                 nome: true,
  //                 tipo: true,
  //                 matricula: true,
  //                 telefone: true,
  //                 Usuario: {
  //                     select: {
  //                         id: true,
  //                         email: true,
  //                         password: true,
  //                     },
  //                 },
  //                 usuarioId: true,
  //             },
  //         });

  //         return paciente;
  //     } catch (error) {
  //         console.error("Erro ao criar paciente:", error);
  //         throw error;
  //     }
  // }

  async ListarTodosPacientes() {
    const pacientes = await prisma.paciente.findMany({
      select: {
        usuarioId: true,
        id: true,
        nome: true,
        tipo: true,
        matricula: true,
        consultas: true,
        dataNascimento: true,
        notificacoes: true,
      },
    });
    return pacientes;
  }

  async BuscarPacienteId(id) {
    const paciente = await prisma.paciente.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        tipo: true,
        dataNascimento: true,
        matricula: true,
        consultas: true,
        telefone: true,
      },
    });
    return paciente;
  }
  async BuscarPacienteIdUsuario(id) {
    const paciente = await prisma.paciente.findUnique({
      where: {
        usuarioId: id,
      },
      select: {
        id: true,
        nome: true,
        tipo: true,
        dataNascimento: true,
        matricula: true,
        consultas: false,
        telefone: true,
        usuarioId: true,
      },
    });
    return paciente;
  }
  async comparePaciente(id) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
      select: {
        nome: true,
        matricula: true,
        telefone: true,
        tipo: true,
      },
    });
    return paciente;
  }

  async AtualizarPaciente(id, data) {
    const paciente = await prisma.paciente.update({
      where: {
        id,
      },
      data,
    });
    return paciente;
  }

  async ExcluirPaciente(id) {
    const usuario = await prisma.paciente.delete({
      where: {
        id,
      },
    });
    return usuario;
  }
}

export default new Paciente();
