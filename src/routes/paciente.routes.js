import { create, get, getId, update, excluir } from '../controllers/pacientes.controller';
const pacienteRoutes = app => {
    app.post("/paciente", create)
    app.get("/pacientes", get)
    app.get("/paciente/:id", getId)
    app.put("/paciente/:id", update)
    app.delete("/paciente/:id", excluir)


}

export default pacienteRoutes;
