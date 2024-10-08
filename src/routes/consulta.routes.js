import {
  create,
  get,
  getId,
  update,
  excluir,
  excluirTodasAsConsultas,
  consultasPaciente,
  excluirTodasAsConsultasProfissional,
  consultasPorProfissional,
  agendarConsulta
} from "../controllers/consulta.controller.js";
import { checkPac, checkAdm, checkPs } from "../services/auth/auth.js";

const consultaRoutes = (app) => {
  // Criar uma nova consulta
  app.post("/consulta", create);


  // Agendar consulta
  app.post("/consulta/agendar", agendarConsulta);

  // Listar todas as consultas
  app.get("/consultas", checkAdm, get);

  // Listar consultas de um paciente específico (com autenticação)
  app.get("/paciente/:id/consultas", checkPac, consultasPaciente);

  // Obter detalhes de uma consulta específica
  app.get("/consulta/:id", checkAdm, getId);

  // Obter detalhes de consultas de um profissional
  // app.get("/consultas-profissional/:idProfissional", checkAdm, consultasPorProfissional);
  app.get("/consultas-profissional/:idProfissional",consultasPorProfissional);

  // Atualizar uma consulta
  app.put("/consulta/:id", checkAdm, update);

  // Excluir uma consulta específica
  app.delete("/consulta/:id", checkAdm, excluir);

  //Excluir todas as consultas de um profissional
  app.delete("/consultas/profissional/:id", checkAdm, excluirTodasAsConsultasProfissional);

  // Excluir todas as consultas
  app.delete("/consultas", excluirTodasAsConsultas);
};

export default consultaRoutes;
