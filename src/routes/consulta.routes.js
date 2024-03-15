import {
  create,
  get,
  getId,
  update,
  excluir,
  excluirTodasAsConsultas,
  consultasPaciente,
} from "../controllers/consulta.controller.js";
import { checkPac, checkAdm, checkPsi } from "../services/auth/auth.js";
// import {
//   validate,
//   rulesValidationConsulta,
// } from "../validations/consultaValidation.js";

const consultaRoutes = (app) => {
  // Criar uma nova consulta
  app.post("/consulta", create);

  // Listar todas as consultas
  app.get("/consultas", get);

  // Listar consultas de um paciente específico (com autenticação)
  app.get("/paciente/:id/consultas", checkPac, consultasPaciente);

  // Obter detalhes de uma consulta específica
  app.get("/consulta/:id", checkAdm, getId);

  // Atualizar uma consulta
  app.put("/consulta/:id", checkAdm, update);

  // Excluir uma consulta específica
  app.delete("/consulta/:id", checkAdm, excluir);

  // Excluir todas as consultas
  app.delete("/consultas", excluirTodasAsConsultas);
};

export default consultaRoutes;
