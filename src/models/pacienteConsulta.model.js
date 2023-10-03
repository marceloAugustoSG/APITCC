import { prisma } from '../services/prisma.js'

export const createConsultaPaciente = async (id, data) => {

    const novaConsulta = await prisma.consulta.create({
        data,
        select: {
            id: false,
            data: true,
            status: true,
            observacao: true,
            pacienteId: true,
        }
    })

    return novaConsulta


}

export const getAllConsultasPaciente = async (id) => {
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
                    Profissional: true, id: true
                }
            },

        },
    })


    return consultasPaciente
}



export const updateConsultaPaciente = async (pacienteId, consultaId, data) => {

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

export const deletarConsultaPaciente = async (idPaciente, idConsulta) => {

    await prisma.consulta.delete({

        where: {
            pacienteId: idPaciente,
            id: idConsulta
        }

    });
    return

}
