import {
  create,
  get,
  getId,
  update,
  excluir,
  excluirTodasAsConsultas,
  consultasPaciente,
} from "../controllers/consulta.controller.js";
import { checkPac } from "../services/auth/auth.js";

const consultaRoutes = (app) => {
  // Criar uma nova consulta
  app.post("/consulta", create);

  // Listar todas as consultas
  app.get("/consultas", get);

  // Listar consultas de um paciente específico (com autenticação)
  app.get("/paciente/:id/consultas", checkPac, consultasPaciente);

  // Obter detalhes de uma consulta específica
  app.get("/consulta/:id", getId);

  // Atualizar uma consulta
  app.put("/consulta/:id", update);

  // Excluir uma consulta específica
  app.delete("/consulta/:id", excluir);

  // Excluir todas as consultas
  app.delete("/consultas", excluirTodasAsConsultas);
};

export default consultaRoutes;
