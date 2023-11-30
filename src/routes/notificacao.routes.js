import {
    createNotificacao,
    getNotificacoes,
    excluirNotificacao

} from "../controllers/notificacao.controller.js";
const notificacaoRoutes = (app) => {
    app.post("/notificar", createNotificacao)
    app.get('/notificacoes', getNotificacoes)
    app.delete("/notificacao/:id", excluirNotificacao);
};

export default notificacaoRoutes;
