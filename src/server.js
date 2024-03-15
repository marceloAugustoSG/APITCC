import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

routes(app);

const port = 3005;

app.get("/", (req, res) => {
  res.status(200).json({ message: `Bem vindo a API de Agendamentos` });
});
app.listen(port);

console.log(`Servidor rodando na porta ${port}`);
