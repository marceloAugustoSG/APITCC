import Consulta from '../models/consulta.model'
import { formatDate } from '../services/Date/Date';

export const create = async (req, res) => {
  try {
    const dataConsulta = req.body
    const consulta = await Consulta.CriarConsulta(dataConsulta);
    const dataFormatada = formatDate(consulta.data_solicitacao)
    consulta.data_solicitacao = formatDate(dataFormatada)
    res.status(200).json(consulta);
  } catch (e) {
    console.log(`${e}`);
    res.status(400).json({ message: "Erro ao criar uma consulta", error: e });
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
    if (consultas.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma consulta foi feita no sistema" });
    } else {
      res.status(200).json(consultas);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const consultaIsExist = await Consulta.BuscarConsultaId(Number(id));
    if (!consultaIsExist) {
      res.status(404).json({ message: "Essa consulta não existe" })
    } else {
      const consulta = await Consulta.AtualizarConsulta(Number(id), data);
      res.status(200).json(consulta);
    }
  } catch (e) {
    console.log(`${e}`)
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    const consulta = await Consulta.ExcluirConsulta(Number(req.params.id));

    if (!consulta) {
      res.status(404).json({ message: "Essa consulta não existe" })

    } else {
      await Consulta.delete(Number(req.params.id));
      res.status(200).send();
    }
  } catch (e) {
    res.status(400).json(e.message);
    console.log(e)
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
