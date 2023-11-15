import { create, get, getId, update, excluir, excluirTodasAsConsultas } from "../controllers/consulta.controller.js";

const consultaRoutes = app => {
    app.post("/consulta", create)
    app.get("/consultas", get)
    app.get("/consulta/:id", getId)
    app.put("/consulta/:id", update)
    app.delete("/consulta/:id", excluir)
    app.delete("/consultas", excluirTodasAsConsultas)
}

export default consultaRoutes