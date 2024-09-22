import { create, listarCompromissosPorProfissional, deletarCompromisso } from "../controllers/compromisso.controller.js";

const compromissoRoutes = (app) => {
    // Criar um novo compromisso
    app.post("/compromisso", create);
    app.get("/compromissos/:profissionalId", listarCompromissosPorProfissional);
    app.delete("/compromisso/:id", deletarCompromisso);


};

export default compromissoRoutes;