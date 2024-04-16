import Profissional from "../models/profissional.model.js";
import { schemaProfissional } from "../validations/profissionalSaude.js";

export const create = async (req, res) => {
  try {
    // Verifica se o email já existe no banco de dados
    const { email } = req.body;
    const existingProfissional = await Profissional.BuscarProfissionalEmail(
      email
    );
    if (existingProfissional) {
      return res
        .status(400)
        .json({ Erro: "Já existe um profissional com este email." });
    }

    // Se o email não existir, continua com a criação do profissional
    schemaProfissional.parse(req.body);
    const profissional = await Profissional.CriarProfissional(req.body);

    res.status(200).json(profissional);
  } catch (e) {
    console.error(e);

    res
      .status(400)
      .json({ Erro: "Erro ao criar um profissional", detalhes: e });
  }
};

export const get = async (req, res) => {
  try {
    const profisionais = await Profissional.ListarTodosProfissionais();
    if (profisionais.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma profissional cadastrado no sistema" });
    } else res.status(200).json(profisionais);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const getId = async (req, res) => {
  try {
    const profisional = await Profissional.BuscarProfissionalId(
      Number(req.params.id)
    );
    if (!profisional) {
      res.status(400).json({ message: "profissional não encontrado" }).send();
    } else {
      res.status(200).json(profisional);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const update = async (req, res) => {
  try {
    schemaProfissional.parse(req.body);
    const profissional = await Profissional.AtualizarProfissional(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(profissional);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    const profisional = await Profissional.BuscarProfissionalId(
      Number(req.params.id)
    );
    if (!profisional) {
      res.status(400).json({ message: "profissional não encontrado" });
    } else {
      await Profissional.ExcluirProfissional(Number(req.params.id));

      res.status(200).json({ message: "Profissional excluido com sucesso" });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
