import { prisma } from '../services/prisma.js'

class Paciente {

    async create(data) {
        try {
            const paciente = await prisma.paciente.create({
                data: {
                    nome: data.nome,
                    tipo: data.tipo,
                    matricula: data.matricula,
                    dataNascimento: data.dataNascimento,
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
        } catch (error) {
            console.error("Erro ao criar paciente:", error);
            throw error; // Lança o erro novamente para que ele possa ser tratado no nível superior
        }
    }

    async getAll() {
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
                consultas: true
            }
        })
        return pacientes
    }

    async getById(id) {
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

    async update(id, data) {

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


    async delete(id) {
        const usuario = await prisma.paciente.delete({
            where: {
                id
            }
        })
        return usuario;
    }
}

export default new Paciente();
