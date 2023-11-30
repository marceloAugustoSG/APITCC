import Notificacao from "../models/notificacao.model.js";
import { prisma } from "../services/prisma.js";

export const createNotificacao = async (req, res) => {
    try {
        const dataNotificacao = req.body
        const notificacao = await Notificacao.criarNotificacao(dataNotificacao)
        res.status(200).json(notificacao);
    } catch (e) {
        res.status(400).json(`teste:${e}`);
    }
};

export const getNotificacoes = async (req, res) => {
    try {
        const notificacoes = await Notificacao.ListarTodasNotificacoes();
        if (notificacoes.length === 0) {
            res
                .status(200)
                .json({ message: "Nenhuma notificação" });
        } else res.status(200).send(notificacoes);
    } catch (e) {
        res.status(400).send(`${e}`);
    }
};
export const excluirNotificacao = async (req, res) => {
    const notificacao = await prisma.notificacao.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    try {
        if (!notificacao) {
            res.status(400).json({ message: "notificacao não encontrada" }).send();

        } else {
            await Notificacao.excluirNotificacao(Number(req.params.id));
            res.status(200).json({ message: "Notificação exluida com sucesso" }).send();
        }

    } catch (e) {
        res.status(400).json(e);
    }
}



