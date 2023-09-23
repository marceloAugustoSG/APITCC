import {
  create,
  get,
  getId,
  update,
  excluir,
  logar,
  checkToken
} from "../controllers/usuario.controller.js";
const usuariosRoutes = (app) => {
  app.post("/login", logar)
  app.post("/usuario", create);
  app.get("/usuarios", get);
  app.get("/usuario/:id", checkToken, getId);
  app.put("/usuario/:id", update);
  app.delete("/usuario/:id", excluir);
};

export default usuariosRoutes;
