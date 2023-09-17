import bcrypt from "bcrypt";
import {
  createPaciente,
  getAll,
  getById,
  updatePaciente,
  deletarPaciente,
} from "../models/paciente.model.js";
import { pacienteValidation } from "../validations/paciente.validation.js";

export const create = async (req, res) => {
  try {
    await pacienteValidation.validate(req.body);
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const paciente = await createPaciente(req.body);
    res.status(200).send(paciente);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req, res) => {
  try {
    const pacientes = await getAll();
    if (pacientes.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma paciente cadastrado no sistema" });
    } else res.status(200).send(pacientes);
  } catch (e) {
    res.status(400).send(e);
  }
};
export const getId = async (req, res) => {
  try {
    const paciente = await getById(Number(req.params.id));
    if (!paciente) {
      res.status(400).json({ message: "Paciente não encontrado" }).send();
    } else {
      res.status(200).json(paciente);
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

    res.status(200).json({ message: "usuario excluido com sucesso" }).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
