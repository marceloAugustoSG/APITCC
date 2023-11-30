import { prisma } from "../services/prisma.js";

class Notificacao {

    async criarNotificacao(data) {
        const notificacao = await prisma.notificacao.create({
            data: {
                mensagem: data.mensagem,
                pacienteId: data.pacienteId,
            }
            , select: {
                mensagem: true,
                pacienteId: true
            }
        })
        return notificacao
    };

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



    async excluirNotificacao(id) {
        await prisma.notificacao.delete({
            where: {
                id,
            },
        });
        return;
    };
}


export default new Notificacao();
