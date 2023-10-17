import Paciente from '../models/paciente.model'

export const create = async (req, res) => {
  try {
    const dataPaciente = req.body.dataPaciente
    console.log(dataPaciente)
    const paciente = await Paciente.create(dataPaciente)
    res.status(200).json(paciente);
  } catch (e) {
    res.status(400).json(`teste:${e}`);
  }
};
export const get = async (req, res) => {
  try {
    const pacientes = await Paciente.getAll();
    if (pacientes.length === 0) {
      res.status(200).json({ message: "Nenhuma paciente cadastrado no sistema" });
    } else res.status(200).json(pacientes);
  } catch (e) {
    res.status(400).json(`teste: ${e}`);
  }
};
export const getId = async (req, res) => {
  try {
    const paciente = await Paciente.getById(Number(req.params.id));
    if (!paciente) {
      res.status(400).json({ message: "Paciente não encontrado" }).send();
    } else {

      res.status(200).json(paciente);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const update = async (req, res) => {
  try {
    const paciente = await Paciente.update(Number(req.params.id), req.body);
    res.status(200).json(paciente);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    await Paciente.delete(Number(req.params.id));
    res.status(200).json({ message: "usuario excluido com sucesso" }).send();
  } catch (e) {
    res.status(400).json({ e });
  }
};
