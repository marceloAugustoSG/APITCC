import {
  createUsuario,
  createUsuarioPaciente,
  get,
  getId,
  update,
  excluir,
} from "../controllers/usuario.controller.js";
import { logar } from "../services/auth/auth.js";
const usuariosRoutes = (app) => {
  app.post("/login", logar)
  app.post("/usuario", createUsuario);
  app.post("/usuarioPaciente", createUsuarioPaciente);
  app.get("/usuarios", get);
  app.get("/usuario/:id", getId);
  app.put("/usuario/:id", update);
  app.delete("/usuario/:id", excluir);
};

export default usuariosRoutes;
