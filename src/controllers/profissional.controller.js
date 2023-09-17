import {
  createProfissional,
  deletarProfissional,
  getAll,
  getById,
  updateProfissional,
  
} from "../models/profissional.model.js";

export const create = async (req, res) => {
  try {
    const profissional = await createProfissional(req.body);

    res.status(200).send(profissional);
  } catch (e) {
    res.status(400).send(e);
    res.json({ Erro: "Erro ao criar um profissional" });
  }
};

export const get = async (req, res) => {
  try {
    const profisionais = await getAll();
    if (profisionais.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma profissional cadastrado no sistema" });
    } else res.status(200).send(profisionais);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req, res) => {
  try {
    const profisional = await getById(Number(req.params.id));
    if (!profisional) {
      res.status(400).json({ message: "profissional não encontrado" }).send();
    } else {
      res.status(200).send(profisional);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const profissional = await updateProfissional(
      Number(req.params.id),
      req.body
    );
    res.status(200).send(profissional);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const excluir = async (req, res) => {
  try {
    await deletarProfissional(Number(req.params.id));

    res
      .status(200)
      .json({ message: "Profissional excluido com sucesso" })
      .send();
  } catch (e) {
    res.status(400).send(e);
  }
};
