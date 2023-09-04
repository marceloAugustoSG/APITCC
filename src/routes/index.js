import pacienteRoutes from "./paciente.routes";
import consultaRoutes from "./consulta.routes";
import consultasPacienteRoutes from "./consultasPaciente.routes";
import profissionalRoutes from "./profissional.routes";
import usuariosRoutes from "./usuarios.routes";

const routes = (app) => {
  pacienteRoutes(app);
  consultaRoutes(app);
  consultasPacienteRoutes(app);
  profissionalRoutes(app);
  usuariosRoutes(app);
};

export default routes;
