import pacienteRoutes from "./paciente.routes.js";
import consultaRoutes from "./consulta.routes.js";
import consultasPacienteRoutes from "./consultasPaciente.routes.js";
import profissionalRoutes from "./profissional.routes.js";
import usuariosRoutes from "./usuarios.routes.js";

const routes = (app) => {
  pacienteRoutes(app);
  consultaRoutes(app);
  consultasPacienteRoutes(app);
  profissionalRoutes(app);
  usuariosRoutes(app);
};

export default routes;
