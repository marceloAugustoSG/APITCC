import { ListarTodasConsultasPaciente, CriarNovaConsultaPaciente, atualizarConsultaPaciente, excluirConsultaPaciente } from "../controllers/pacienteConsulta.controller.js"
import { checkPac } from "../services/auth/auth.js"
const consultasPacienteRoutes = app => {
    app.post("/paciente/:id/consulta", checkPac, CriarNovaConsultaPaciente)
    app.get("/paciente/:id/consultas", checkPac, ListarTodasConsultasPaciente)
    app.put("/paciente/:id/consultas/:id", checkPac, atualizarConsultaPaciente)
    app.delete("/paciente/:id/consultas/:id", checkPac, excluirConsultaPaciente)
}

export default consultasPacienteRoutes