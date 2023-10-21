import { prisma } from '../services/prisma.js'

class ConsultaPaciente {




    async createConsultaPaciente(id, data) {

        const novaConsulta = await prisma.consulta.create({
            data,
            select: {
                id: false,
                data: true,
                status: true,
                observacao: true,
                pacienteId: true,
                Paciente: true,
                servico: true,
            }
        })

        return novaConsulta


    }

    async getAllConsultasPaciente(id) {
        const consultasPaciente = await prisma.paciente.findUnique({
            where: {
                id
            }, select: {
                id: true,
                nome: true,
                matricula: true,
                tipo: true,
                consultas: {
                    select: {
                        data: true,
                        status: true,
                        servico: true, observacao: true,
                        Paciente: true,
                        Profissional: true,
                        id: true,
                        data_solicitacao: true
                    }
                },

            },
        })


        return consultasPaciente
    }



    async updateConsultaPaciente(pacienteId, consultaId, data) {

        const consultaPaciente = await prisma.consulta.update({
            where: {
                pacienteId: pacienteId,
                id: consultaId
            }, data
            , select: {
                id: true,
                data: true,
                status: true,
                observacao: true,
                pacienteId: true
            }

        });
        return consultaPaciente

    }

    async deletarConsultaPaciente(idPaciente, idConsulta) {

        await prisma.consulta.delete({

            where: {
                pacienteId: idPaciente,
                id: idConsulta
            }

        });
        return
    }
}
export default new ConsultaPaciente()
