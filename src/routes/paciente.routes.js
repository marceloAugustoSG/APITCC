import { create, get, getId, update, excluir, getUserId } from '../controllers/paciente.controller.js';
const pacienteRoutes = app => {
    app.post("/paciente", create)
    app.get("/pacientes", get)
    app.get("/paciente/:id", getId)
    app.get("/pacienteUsuario/:id", getUserId)
    app.put("/paciente/:id", update)
    app.delete("/paciente/:id", excluir)
}

export default pacienteRoutes;
