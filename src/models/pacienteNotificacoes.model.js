import { prisma } from '../services/prisma.js'

class NotificacaoPaciente {
    async createNotificacaoPaciente(id, data) {

        const novaNotificacao = await prisma.notificacao.create({
            data,
            select: {
                id: true,
                mensagem: true,
                pacienteId: true,
            }
        })

        return novaNotificacao
    }

    async getAllNotificacoesPaciente(id) {
        const notificacoesPaciente = await prisma.paciente.findUnique({
            where: {
                id
            }, select: {
                id: true,
                nome: true,
                notificacoes: {
                    select: {
                        id: true,
                        mensagem: true,
                        pacienteId: true
                    }
                }

            }
        })
        return notificacoesPaciente
    }

    async updateNotificacaoPaciente(pacienteId, notificacaoId, data) {

        const notificacaoPaciente = await prisma.notificacao.update({
            where: {
                pacienteId: pacienteId,
                id: notificacaoId
            }, data
            , select: {
                id: true,
                mensagem: true,
                pacienteId: true
            }

        });
        return notificacaoPaciente

    }

    async deletarNotificacaoPaciente(pacienteId, notificacaoId) {

        await prisma.notificacao.delete({

            where: {
                pacienteId: pacienteId,
                id: notificacaoId
            }

        });
        return
    }
}
export default new NotificacaoPaciente()
