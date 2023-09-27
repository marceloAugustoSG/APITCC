import { getPacienteConsultas, createNewConsulta, atualizarConsultaPaciente, excluirConsultaPaciente } from "../controllers/pacienteConsulta.controller.js"
import { checkToken } from "../controllers/usuario.controller.js"
const consultasPacienteRoutes = app => {
    app.post("/paciente/:id/consulta", checkToken, createNewConsulta)
    app.get("/paciente/:id/consultas", checkToken, getPacienteConsultas)
    app.put("/paciente/:id/consultas/:id", atualizarConsultaPaciente)
    app.delete("/paciente/:id/consultas/:id", excluirConsultaPaciente)

}

export default consultasPacienteRoutes