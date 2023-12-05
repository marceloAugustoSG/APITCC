import NotificacaoPaciente from "../models/pacienteNotificacoes.model"

export const CriarNovaNotificacaoPaciente = async (req, res) => {
    try {
        const idPaciente = Number(req.params.id)
        const data = req.body
        data.pacienteId = idPaciente
        const notificacaoPaciente = await NotificacaoPaciente.createNotificacaoPaciente(idPaciente, data)
        res.status(200).json(notificacaoPaciente)
    } catch (e) {
        res.status(400).json({ message: `${e}` })
    }
}
export const ListarTodasNotificacoesPaciente = async (req, res) => {
    try {
        const { id } = req.params
        const notificacoes = await NotificacaoPaciente.getAllNotificacoesPaciente(Number(id))

        res.status(200).json(notificacoes)
    } catch (e) {
        res.status(404).json({ message: `Paciente não encontrado` })
    }
}
export const atualizarNotificacaoPaciente = async (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const idPaciente = data.pacienteId
    try {
        const notificacaoPaciente = await NotificacaoPaciente.updateNotificacaoPaciente(idPaciente, id, data)
        res.status(200).json(notificacaoPaciente)
    } catch (e) {
        res.status(400).json(e)
    }
}
export const excluirNotificacaoPaciente = async (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const idPaciente = data.pacienteId
    try {
        await NotificacaoPaciente.deletarNotificacaoPaciente(idPaciente, id)
        res.status(200).json({ "message": "notificacao excluida com sucesso" })
    } catch (e) {
        res.status(400).json(e)
    }
}
