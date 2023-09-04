import { isValid, utcToZonedTime, format, DateTimeFormat, intlFormat } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import {
  createConsulta,
  getAll,
  getById,
  updateConsulta,
  deletarConsulta,
  deleteAllConsultas,
} from "../models/consulta.model";
import ptBR from "date-fns/locale/pt-BR";

const opcoesLocais = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

export const create = async (req, res) => {
  try {
    const consulta = await createConsulta(req.body);
    consulta.data = consulta.data.toLocaleString('pt-BR', opcoesLocais)

    res.status(200).send(consulta);
  } catch (e) {
    res.status(400).send(e);
    res.json({ Erro: "Erro ao criar uma consulta" });
  }
};

export const getId = async (req, res) => {
  try {
    const consulta = await getById(Number(req.params.id));

    if (!consulta) {
      res.status(400).json({ message: "Consulta não encontrada" });
    } else {

      consulta.data = consulta.data.toLocaleString('pt-BR', opcoesLocais)
      res.status(200).send(consulta);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req, res) => {
  try {
    const consultas = await getAll();

    if (consultas.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma consulta foi feita no sistema" });
    } else {
      consultas.forEach(data => {
        data.data = data.data.toLocaleString('pt-BR', opcoesLocais)
      })
      res.status(200).send(consultas);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const consulta = await updateConsulta(Number(id), data);
    res.status(200).send(consulta);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const excluir = async (req, res) => {
  try {
    await deletarConsulta(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export const excluirTodasAsConsultas = async (req, res) => {
  try {
    await deleteAllConsultas();
    res.status(200).json({ message: "Todas as consultas foram excluidas" });
  } catch (e) {
    res.status(400).send(e).json({ error: "erro interno" });
  }
};
