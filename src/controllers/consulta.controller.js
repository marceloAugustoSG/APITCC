import Consulta from "../models/consulta.model.js";
import { formatDate } from "../services/Date/Date.js";
import { schema } from "../validations/consulta.validation.js";

export const create = async (req, res) => {
  try {
    const dataConsulta = req.body;
    const consulta = await Consulta.CriarConsulta(dataConsulta);
    const dataFormatada = formatDate(consulta.data_solicitacao);
    consulta.data_solicitacao = formatDate(dataFormatada);
    res.status(200).json(consulta);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Erro ao criar uma consulta", e });
  }
};
export const getId = async (req, res) => {
  try {
    const consulta = await Consulta.BuscarConsultaId(Number(req.params.id));
    if (!consulta) {
      res.status(404).json({ message: "Consulta não encontrada" });
    } else {
      res.status(200).json(consulta);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req, res) => {
  try {
    const consultas = await Consulta.ListarTodasConsultas();
    res.status(200).json({ consultas });
    // if (consultas.length === 0) {
    //   res.status(200).json({
    //     message: "Nenhuma consulta foi feita no sistema",
    //     totalConsultas: consultas.length,
    //   });
    // } else {
    //   res.status(200).json(consultas);
    // }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    schema.parse(data);
    const consultaIsExist = await Consulta.compareConsulta(Number(id));
    if (!consultaIsExist) {
      res.status(404).json({ message: "Essa consulta não existe" });
      return;
    }
    // Comparar os dados recebidos com os dados existentes
    if (JSON.stringify(data) === JSON.stringify(consultaIsExist)) {
      res.status(304).json({ message: "Não houve alterações" });
      return;
    }

    // Atualizar os dados se houver alterações
    await Consulta.AtualizarConsulta(Number(id), data);
    res.status(200).json({ message: "Consulta atualizada" });
  } catch (e) {
    console.log(`${e}`);
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    const consultaIsExist = await Consulta.BuscarConsultaId(
      Number(req.params.id)
    );
    if (!consultaIsExist) {
      res.status(404).json({ message: "Essa consulta não existe" });
    } else {
      await Consulta.ExcluirConsulta(Number(req.params.id));
      res.status(200).json({ message: "Consulta Excluida com sucesso!" });
    }
  } catch (e) {
    console.error(e);
  }
};

export const excluirTodasAsConsultas = async (req, res) => {
  try {
    await Consulta.deleteAll();
    res.status(200).json({ message: "Todas as consultas foram excluidas" });
  } catch (e) {
    res.status(400).json(e).json({ error: "erro interno" });
  }
};

export const consultasPaciente = async (req, res) => {
  const idPaciente = Number(req.params.id);
  console.log(idPaciente);
  try {
    const consultas = await Consulta.consultasPaciente(idPaciente);
    res.status(200).json({ consultas });
  } catch (error) {
    res.status(400).json({ message: `Erro ${error}` });
  }
};
