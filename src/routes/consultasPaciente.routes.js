import { getPacienteConsultas, createNewConsulta, atualizarConsultaPaciente, excluirConsultaPaciente } from "../controllers/pacienteConsulta.controller.js"


const consultasPacienteRoutes = app => {
    app.post("/paciente/:id/consulta", createNewConsulta)
    app.get("/paciente/:id/consultas", getPacienteConsultas)
    app.put("/paciente/:id/consultas/:id", atualizarConsultaPaciente)
    app.delete("/paciente/:id/consultas/:id", excluirConsultaPaciente)

}

export default consultasPacienteRoutes