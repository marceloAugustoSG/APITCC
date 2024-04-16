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
      res.status(404).json({ message: "Paciente não encontrado" });
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
  const id = req.params.id;
  const data = req.body;
  console.log("Dados do paciente");
  console.log(data);
  try {
    const pacienteIsExist = await Paciente.comparePaciente(Number(id));
    console.log("Paciente existe: ");
    console.log(pacienteIsExist);
    if (!pacienteIsExist) {
      res.status(404).json({ message: "Paciente não encontrado" });
      return;
    }
    // Comparar os dados recebidos com os dados existentes
    if (JSON.stringify(data) === JSON.stringify(pacienteIsExist)) {
      res.status(304).json({ message: "Não houve alterações" });
      return;
    }

    // Atualizar os dados se houver alterações
    await Paciente.AtualizarPaciente(Number(id), data);
    res.status(200).json({ message: "Paciente atualizado" });
  } catch (e) {
    console.log(`${e}`);
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
