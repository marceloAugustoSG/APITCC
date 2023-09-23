import { prisma } from '../services/prisma.js'



// Função para criar um novo paciente
export const createPaciente = async (data) => {
    const paciente = await prisma.paciente.create({
        data: {
            nome: data.nome,
            tipo: data.tipo,
            matricula: data.matricula,
            telefone: data.telefone,

            usuario: {
                connect: { id: data.usuarioId },
            },
        },
        select: {
            id: true,
            nome: true,
            tipo: true,
            matricula: true,
            telefone: true,
            usuario: {
                select: {
                    id: true,
                    email: true,
                    password: true,
                },
            },
            usuarioId: true
        },
    });

    return paciente;
};


export const getAll = async () => {
    const pacientes = await prisma.paciente.findMany({
        select: {
            usuario: {
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            },
            id: true,
            nome: true,
            tipo: true,
            matricula: true,
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
            matricula: true,
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
            tipo: true,
            matricula: true
        }
    })
    return paciente

}


export const deletarPaciente = async (id) => {
    const usuario = await prisma.paciente.delete({
        where: {
            id
        }
    })
    return usuario;
}
