import {
  create,
  get,
  getId,
  update,
  excluir,
} from "../controllers/profissional.controller.js";

const profissionalRoutes = (app) => {
  app.post("/profissional", create);
  app.get("/profissionais", get);
  app.get("/profissional/:id", getId);
  app.put("/profissional/:id", update);
  app.delete("/profissional/:id", excluir);
};

export default profissionalRoutes;
