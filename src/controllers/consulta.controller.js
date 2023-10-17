import Consulta from '../models/consulta.model'

export const create = async (req, res) => {
  try {
    const consulta = await Consulta.create(req.body);
    res.status(200).json(consulta);
  } catch (e) {
    console.log(`${e}`)
    res.status(400).json({ message: "erro ao criar uma consulta", e });
  }
};
export const getId = async (req, res) => {
  try {
    const consulta = await Consulta.getById(Number(req.params.id));

    if (!consulta) {
      res.status(400).json({ message: "Consulta não encontrada" });
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
    const consulta = await Consulta.update(Number(id), data);
    res.status(200).json(consulta);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const excluir = async (req, res) => {
  try {
    await Consulta.delete(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).json(e.message);
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
