import Notificacao from "../models/notificacao.model.js";
import Paciente from '../models/paciente.model.js'

export const createNotificacao = async (req, res) => {
    try {
        const dataNotificacao = req.body
        const pacienteId = req.params.idPaciente

        const IsPacienteExist = await Paciente.BuscarPacienteId(Number(pacienteId))
        if (!IsPacienteExist) {
            res.status(404).json({ message: `Paciente não encontrado` });
            return;
        }
        const notificacao = await Notificacao.criarNotificacao(dataNotificacao, Number(pacienteId))
        res.status(201).json({ notificacao });
    } catch (e) {
        res.status(400).json({ message: `Erro ao criar notificação` });
    }
};

export const ListarTodasNotificacoes = async (req, res) => {
    try {
        const notificacoes = await Notificacao.ListarTodasNotificacoes();
        if (notificacoes.length === 0) {
            res.status(200).json({ message: "Nenhuma notificação" });
        } else res.status(201).send(notificacoes);
    } catch (e) {
        res.status(400).send(`${e}`);
    }
};



export const listarNotificacaoPaciente = async (req, res) => {

    const idPaciente = Number(req.params.idPaciente)
    try {
        const isPacienteExist = await Paciente.BuscarPacienteId(idPaciente)
        if (!isPacienteExist) {
            res.status(404).json({ message: `Paciente não encontrado` })
            return;
        }
        const notificacoes = await Notificacao.ListarNotificacoesPaciente(idPaciente)
        res.status(200).json({ notificacoes })
    } catch (error) {
    }
}
export const excluirNotificacao = async (req, res) => {
    const idNotificacao = Number(req.params.idNotificacao)
    try {
        const isNotificacaoExist = await Notificacao.BuscarNotificacaoID(idNotificacao)

        if (!isNotificacaoExist) {
            res.status(404).json({ message: `Notificação não encontrada` })
            return;
        }
        await Notificacao.excluirNotificacao(idNotificacao)
        res.status(200).json({ message: `Notificação excluida` })
    } catch (error) {
        res.status(200).json({ Erro: `Erro ${error}` })
    }

}


