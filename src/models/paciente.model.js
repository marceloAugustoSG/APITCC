import { prisma } from '../services/prisma.js'

class Paciente {

    async CriarPaciente(data) {
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
            throw error;
        }
    }

    async ListarTodosPacientes() {
        const pacientes = await prisma.paciente.findMany({
            select: {
                usuario: false,
                id: true,
                nome: true,
                tipo: true,
                matricula: true,
                consultas: true,
            }
        })
        return pacientes
    }

    async BuscarPacienteId(id) {
        const paciente = await prisma.paciente.findUnique({
            where: {
                id,
            }, select: {
                nome: true,
                tipo: true,
                dataNascimento: true,
                matricula: true,
                consultas: true,
                telefone: true
            }
        })
        return paciente
    }

    async AtualizarPaciente(id, data) {

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


    async ExcluirPaciente(id) {
        const usuario = await prisma.paciente.delete({
            where: {
                id
            }
        })
        return usuario;
    }
}

export default new Paciente();
