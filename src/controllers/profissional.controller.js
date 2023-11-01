import {
  AtualizarProfissional,
  BuscarProfissionalId,
  CriarProfissional,
  ExcluirProfissional,
  ListarTodosProfissionais,
  createProfissional,
  deletarProfissional,
  getAll,
  getById,
  updateProfissional,

} from "../models/profissional.model.js";

export const create = async (req, res) => {
  try {
    const profissional = await CriarProfissional(req.body);

    res.status(200).json(profissional);
  } catch (e) {
    res.status(400).json(e);
    res.json({ Erro: "Erro ao criar um profissional" });
  }
};

export const get = async (req, res) => {
  try {
    const profisionais = await ListarTodosProfissionais();
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
    const profisional = await BuscarProfissionalId(Number(req.params.id));
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
    const profissional = await AtualizarProfissional(
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

    const profisional = await BuscarProfissionalId(Number(req.params.id));
    if (!profisional) {
      res.status(400).json({ message: "profissional não encontrado" })
    } else {
      await ExcluirProfissional(Number(req.params.id));

      res
        .status(200)
        .json({ message: "Profissional excluido com sucesso" })
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
