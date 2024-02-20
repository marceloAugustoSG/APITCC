import { prisma } from "../services/prisma.js";

class Notificacao {

    async criarNotificacao(data, pacienteId) {
        const notificacao = await prisma.notificacao.create({
            data: {
                mensagem: data.mensagem,
                pacienteId
            }
            , select: {
                mensagem: true,
                pacienteId: true
            }
        })
        return notificacao
    };

    async BuscarNotificacaoID(id) {
        const notificacao = await prisma.notificacao.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                mensagem: true
            }
        })
        return notificacao;

    }

    async ListarTodasNotificacoes() {
        const notificacoes = await prisma.notificacao.findMany({
            select: {
                id: true,
                mensagem: true,
                pacienteId: true
            }
        })
        return notificacoes;
    };

    async ListarNotificacoesPaciente(pacienteId) {
        const notificacoesPaciente = await prisma.notificacao.findMany({
            where: {
                pacienteId
            }, select: {
                id: true,
                mensagem: true
            }
        })
        return notificacoesPaciente
    }

    async excluirNotificacao(idNotificacao) {
        await prisma.notificacao.delete({
            where: {
                id: idNotificacao
            }
        });
        return;
    }
}

export default new Notificacao();
