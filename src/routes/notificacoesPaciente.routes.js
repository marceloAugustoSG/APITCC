import { ListarTodasNotificacoesPaciente, CriarNovaNotificacaoPaciente, atualizarNotificacaoPaciente, excluirNotificacaoPaciente } from "../controllers/pacienteNotificacao.controller"
import { checkPac } from "../services/auth/auth.js"
const notificacoesPacienteRoutes = app => {
    app.post("/paciente/:id/notificacao", CriarNovaNotificacaoPaciente)
    app.get("/paciente/:id/notificacoes", ListarTodasNotificacoesPaciente)
    app.put("/paciente/:id/notificacoes/:id", checkPac, atualizarNotificacaoPaciente)
    app.delete("/paciente/:id/notificacao/:id", excluirNotificacaoPaciente)
}

export default notificacoesPacienteRoutes