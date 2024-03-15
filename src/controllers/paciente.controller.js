import Paciente from "../models/paciente.model.js";

export const create = async (req, res) => {
  try {
    const dataPaciente = req.body;

    console.log(dataPaciente);
    Paciente.CriarPaciente(dataPaciente);
    res.status(200).json({ message: "Usuário criado com sucesso" });
    return;
  } catch (e) {
    res.status(400).json(`teste:${e}`);
  }
};
export const get = async (req, res) => {
  try {
    const pacientes = await Paciente.ListarTodosPacientes();
    if (pacientes.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma paciente cadastrado no sistema" });
    } else res.status(200).json(pacientes);
  } catch (e) {
    res.status(400).json(`teste: ${e}`);
  }
};
export const getId = async (req, res) => {
  try {
    const paciente = await Paciente.BuscarPacienteId(Number(req.params.id));
    console.log("Paciente:" + paciente);
    if (!paciente) {
      res.status(404).json({ message: "Paciente não encontrado" }).send();
      console.log("teste");
    } else {
      res.status(200).json(paciente);
    }
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
};
export const getUserId = async (req, res) => {
  try {
    const paciente = await Paciente.BuscarPacienteIdUsuario(
      Number(req.params.id)
    );
    console.log("Paciente:" + paciente);
    if (!paciente) {
      res.status(404).json({ message: "Paciente não encontrado" }).send();
      console.log("teste");
    } else {
      res.status(200).json(paciente);
    }
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
};

export const update = async (req, res) => {
  try {
    const paciente = await Paciente.AtualizarPaciente(
      Number(req.params.id),
      req.body
    );
    if (!paciente) {
      res.status(401).json({ message: "Paciente não encontrado" });
    }
    res.status(200).json(paciente);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    await Paciente.ExcluirPaciente(Number(req.params.id));
    res.status(200).json({ message: "usuario excluido com sucesso" }).send();
  } catch (e) {
    res.status(400).json({ e });
  }
};
