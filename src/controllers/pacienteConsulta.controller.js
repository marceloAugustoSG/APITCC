import ConsultaPaciente from "../models/pacienteConsulta.model.js";

export const CriarNovaConsultaPaciente = async (req, res) => {
    try {
        const idPaciente = Number(req.params.id)
        const data = req.body
        data.pacienteId = idPaciente
        const consultaPaciente = await ConsultaPaciente.createConsultaPaciente(idPaciente, data)
        res.status(200).json(consultaPaciente)
    } catch (e) {
        res.status(400).json({ message: `${e}` })
    }
}
export const ListarTodasConsultasPaciente = async (req, res) => {
    try {
        const { id } = req.params
        const consultas = await ConsultaPaciente.getAllConsultasPaciente(Number(id));

        if (consultas.consultas.length === 0) {
            res.status(200).json({ "message": `O Paciente ${consultas.nome} não possui nenhuma consulta agendada` })
        } else {
            res.status(200).json({ consultas })
        }
    } catch (e) {
        res.status(404).json({ message: `Paciente não encontrado` })
    }
}
export const atualizarConsultaPaciente = async (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const idPaciente = data.pacienteId
    try {
        const consultaPaciente = await ConsultaPaciente.updateConsultaPaciente(idPaciente, id, data)
        res.status(200).json(consultaPaciente)
    } catch (e) {
        res.status(400).json(e)
    }
}
export const excluirConsultaPaciente = async (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const idPaciente = data.pacienteId
    try {
        await ConsultaPaciente.deletarConsultaPaciente(idPaciente, id)
        res.status(200).json({ "message": "consulta excluida com sucesso" })
    } catch (e) {
        res.status(400).json(e)
    }
}
