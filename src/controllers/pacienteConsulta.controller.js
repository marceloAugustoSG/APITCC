import { getAllConsultasPaciente, createConsultaPaciente, deletarConsultaPaciente, updateConsultaPaciente } from "../models/pacienteConsulta.model.js";

export const getPacienteConsultas = async (req, res) => {
    try {
        const { id } = req.params
        const consultas = await getAllConsultasPaciente(Number(id));

        if (consultas.consultas.length === 0) {
            res.status(404).json({ "message": `O usuario ${consultas.nome} não possui nenhuma consulta agendada` })
        } else {
            res.status(200).json({ consultas })
        }
    } catch (e) {
        res.status(400).json({ message: `Usuario não encontrado` })
    }
}
export const createNewConsulta = async (req, res) => {
    try {
        const idPaciente = Number(req.params.id)
        const data = req.body
        data.pacienteId = idPaciente
        const consultaPaciente = await createConsultaPaciente(idPaciente, data)
        res.status(200).json(consultaPaciente)

    } catch (e) {
        res.status(404).json({ message: `${e}` })

    }

}
export const atualizarConsultaPaciente = async (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const idPaciente = data.pacienteId
    try {
        const consultaPaciente = await updateConsultaPaciente(idPaciente, id, data)
        res.status(200).send(consultaPaciente)
    } catch (e) {
        res.status(400).send(e)
    }
}
export const excluirConsultaPaciente = async (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const idPaciente = data.pacienteId
    try {
        await deletarConsultaPaciente(idPaciente, id)
        res.status(200).json({ "message": "consulta excluida com sucesso" })
    } catch (e) {
        res.status(400).send(e)
    }
}

