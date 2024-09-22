import { logar } from "../services/auth/auth.js";
import {
  createUsuario,
  createUsuarioPaciente,
  createUsuarioProfissional,
  get,
  getId,
  update,
  excluir,
  obterIdProfissionalSaudePorIdUsuario
} from "../controllers/usuario.controller.js";
const usuariosRoutes = (app) => {
  app.post("/login", logar);
  app.post("/usuario", createUsuario);
  app.post("/usuarioPaciente", createUsuarioPaciente);
  app.post("/usuarioPsicologo", createUsuarioProfissional);
  app.get('/profissional-saude/:usuarioId', obterIdProfissionalSaudePorIdUsuario);
  app.get("/usuarios", get);
  app.get("/usuario/:id", getId);
  app.put("/usuario/:id", update);
  app.delete("/usuario/:id", excluir);
};

export default usuariosRoutes;
