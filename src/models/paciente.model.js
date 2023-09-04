import { prisma } from '../services/prisma'

export const createPaciente = async (data) => {

    const paciente = await prisma.paciente.create({
        data,
        select: {
            id: true,
            nome: true,
            email: true,
            password: false,
            tipo: true,
            consultas: true

        }
    })
    return paciente
}


export const getAll = async () => {
    const pacientes = await prisma.paciente.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            password: false,
            tipo: true,
            consultas: true

        }
    })


    return pacientes
}

export const getById = async (id) => {
    const paciente = await prisma.paciente.findUnique({
        where: {
            id
        }, select: {
            id: true,
            nome: true,
            email: true,
            password: false,
            tipo: true,
            consultas: true
        }

    })
    return paciente
}

export const updatePaciente = async (id, data) => {

    const paciente = await prisma.paciente.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            nome: true,
            email: true,
            password: false,
            tipo: true
        }
    })
    return paciente

}


export const deletarPaciente = async (id) => {
    await prisma.paciente.delete({
        where: {
            id
        }
    })
    return
}
