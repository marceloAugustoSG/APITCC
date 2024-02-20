import {
  createNotificacao,
  ListarTodasNotificacoes,
  excluirNotificacao,
  listarNotificacaoPaciente,
} from "../controllers/notificacao.controller.js";

const notificacaoRoutes = (app) => {
  // Notificar um paciente
  app.post("/paciente/:idPaciente/notificar", createNotificacao);

  // Listar todas as notificações
  app.get("/notificacoes", ListarTodasNotificacoes);

  // Listar notificações de um paciente específico
  app.get("/paciente/:idPaciente/notificacoes", listarNotificacaoPaciente);

  // Excluir uma notificação
  app.delete("/notificacao/:idNotificacao", excluirNotificacao);
};

export default notificacaoRoutes;
