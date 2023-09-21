import { createUsuario, getAll } from "../models/usuario.model.js";

export const create = async (req, res) => {
  try {


    const usuario = await createUsuario(req.body)
    console.log(req.body)

    res.status(200).send(usuario);
  } catch (e) {
    res.status(400).json({ Erro: "Erro ao criar um usuario: " + e });
  }
};

export const get = async (req, res) => {
  try {
    const usuarios = await getAll();
    if (usuarios.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma usuario cadastrado no sistema" });
    } else res.status(200).send(usuarios);
  } catch (e) {
    res.status(400).send(e);
  }
};
export const getId = async (req, res) => {
  try {
    const paciente = await getById(Number(req.params.id));
    if (!paciente) {
      res.status(400).json({ message: "Usuario não encontrado" }).send();
    } else {
      res.status(200).send(paciente);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const paciente = await updatePaciente(Number(req.params.id), req.body);
    res.status(200).send(paciente);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const excluir = async (req, res) => {
  try {
    await deletarPaciente(Number(req.params.id));

    res.status(200).json({ message: "Usuario excluido com sucesso" }).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
