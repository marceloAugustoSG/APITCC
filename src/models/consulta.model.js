import { prisma } from "../services/prisma.js";
import Compromisso from "./compromisso.model.js";

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



  // async AgendarConsulta(idConsulta, dataConsulta, idProfissional) {
  //   const consulta = await prisma.consulta.update({
  //     where: {
  //       id: idConsulta, // Identifica a consulta a ser atualizada
  //     },
  //     data: {
  //       status: 'confirmada', // Atualiza o status para 'confirmada'
  //       data: dataConsulta, // Define a nova data da consulta
  //       profissionalId: idProfissional, // Associa o profissional à consulta
  //     },
  //     select: {
  //       id: true,
  //       data: true,
  //       status: true,
  //       observacao: true,
  //       pacienteId: true,
  //       profissionalId: true,
  //       data_solicitacao: true,
  //       Paciente: true,
  //       Profissional: true,
  //       servico: true,
  //       respostas: true,
  //     },
  //   });

  //   return consulta;
  // }


  async verificarDisponibilidade(profissionalId, dataConsulta) {
    // Calcula o intervalo de tempo desejado (1 hora)
    const inicioIntervalo = new Date(new Date(dataConsulta).getTime() - 60 * 60 * 1000); // 1 hora antes
    const fimIntervalo = new Date(new Date(dataConsulta).getTime() + 60 * 60 * 1000);  // 1 hora depois

    console.log(inicioIntervalo)
    console.log(fimIntervalo)

    // Verifica se existe uma consulta já marcada dentro desse intervalo
    const consultaExistente = await prisma.consulta.findFirst({
      where: {
        profissionalId: profissionalId,
        data: {
          gte: inicioIntervalo, // Verifica se já existe consulta 1 hora antes
          lte: fimIntervalo,    // Verifica se já existe consulta até 1 hora depois
        },
        status: "Confirmada", // Apenas consultas confirmadas
      },
    });

    // Retorna true se o horário estiver disponível (ou seja, sem consultas conflitantes)
    return !consultaExistente;
  }


 

 
  async AgendarConsulta(idConsulta, dataConsulta, idProfissional) {
  // Verificar se o horário está disponível
  // const horarioDisponivel = await this.verificarDisponibilidade(idProfissional, dataConsulta);
  // const horarioDisponivel = await this.verificarDisponibilidade(idProfissional, dataConsulta);
  const horarioDisponivel = await Compromisso.verificarConflitoEDisponibilidade (idProfissional, dataConsulta);
  console.log('Horário Disponível:', horarioDisponivel);

  // Verificar se há conflito com outros compromissos
  // const conflitoHorario = await this.verificarConflitoCompromisso(idProfissional, dataConsulta);
  // console.log('Conflito Compromisso:', conflitoHorario);

  if (!horarioDisponivel) {
    throw new Error('Horário já ocupado para esse profissional');
  }

  // Se ambos os testes passarem, agendar a consulta
  const consulta = await prisma.consulta.update({
    where: {
      id: idConsulta,
    },
    data: {
      status: 'Confirmada',
      data: dataConsulta,
      profissionalId: idProfissional,
    },
    select: {
      id: true,
      data: true,
      status: true,
      observacao: true,
      pacienteId: true,
      profissionalId: true,
      data_solicitacao: true,
      Paciente: {
        select: {
          nome: true,
          Usuario: {
            select: {
              email: true
            }
          }
        }
      },
      Profissional: {
        select: {
          nome: true,
          especialidade: true,
          email: true
        }
      },
      servico: true,
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

  //Função que retorna todas as consultas de um profissional

  async listarConsultasPorProfissional(profissionalId) {
  const consultas = await prisma.consulta.findMany({
    where: {
      profissionalId: profissionalId,
    },
    select: {
      data: true,
      data_solicitacao: true,
      status: true,
      respostas: true,
      Paciente: {
        select: {
          nome: true,
        },
      },
      Profissional: {
        select: {
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
