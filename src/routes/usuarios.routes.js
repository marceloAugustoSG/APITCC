import {
  create,
  get,
  getId,
  update,
  excluir,
} from "../controllers/usuarioController.js";
const usuariosRoutes = (app) => {
  app.post("/usuario", create);
  app.get("/usuarios", get);
  app.get("/usuario/:id", getId);
  app.put("/usuario/:id", update);
  app.delete("/usuario/:id", excluir);
};

export default usuariosRoutes;
