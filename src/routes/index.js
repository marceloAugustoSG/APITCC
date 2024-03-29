import pacienteRoutes from "./paciente.routes.js";
import consultaRoutes from "./consulta.routes.js";
import profissionalRoutes from "./profissional.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import notificacaoRoutes from "./notificacao.routes.js";

const routes = (app) => {
  pacienteRoutes(app);
  consultaRoutes(app);
  profissionalRoutes(app);
  usuariosRoutes(app);
  notificacaoRoutes(app)
};

export default routes;
