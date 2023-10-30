import Consulta from '../models/consulta.model'
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const create = async (req, res) => {
  try {
    // Fuso horário de Brasília
    const brasiliaTimeZone = 'America/Sao_Paulo';

    // Obtenha a data atual no fuso horário de Brasília
    const dataAtual = new Date();
    const brasiliaDate = utcToZonedTime(dataAtual, brasiliaTimeZone);
    const dataConsulta = req.body
    const consulta = await Consulta.create(dataConsulta);
    consulta.data_solicitacao = format(brasiliaDate, "yyyy-MM-dd'T'HH:mm:ssXXX"), // Formate a data
      res.status(200).json(consulta);
  } catch (e) {
    console.log(`${e}`);
    res.status(400).json({ message: "Erro ao criar uma consulta", error: e });
  }
};
export const getId = async (req, res) => {
  try {
    const consulta = await Consulta.getById(Number(req.params.id));
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
    const consultas = await Consulta.getAll();

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

    const consultaIsExist = await Consulta.getById(Number(id));
    if (!consultaIsExist) {
      res.status(404).json({ message: "Essa consulta não existe" })
    } else {
      const consulta = await Consulta.update(Number(id), data);
      res.status(200).json(consulta);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    const consulta = await Consulta.getById(Number(req.params.id));

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
