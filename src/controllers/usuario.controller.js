import Usuario from "../models/usuario.model.js";
import { prisma } from "../services/prisma.js";
import bcrypt from 'bcrypt'

export const createUsuario = async (req, res) => {

  const { email, password } = req.body

  const user = await prisma.usuario.findUnique({
    where: {
      email
    }
  })
  if (!email) {
    res.status(404).json({ message: "Email inválido" })
  }
  if (!password) {
    res.status(404).json({ message: "Senha inválida" })
  } if (user) {
    res.status(404).json({ message: "usuário ja existe" })
  } else {

    const hashPassword = await bcrypt.hash(password, 10)
    try {
      const usuarioCriado = {
        email: req.body.email,
        password: hashPassword,
        regra: req.body.regra

      }
      await Usuario.CriarUsuario(usuarioCriado)
      res.status(200).json({ message: `usuario criado com sucesso!` });
    } catch (e) {
      res.status(400).json({ Erro: `Erro ao criar um usuario: ${e}` });
    }

  }

};

export const createUsuarioPaciente = async (req, res) => {

  const { email, password } = req.body

  if (!email.endsWith('@edu.ufes.br')) {
    res.status(404).json({ message: "email não aceito" })
  } else {
    const user = await prisma.usuario.findUnique({
      where: {
        email
      }
    })

    if (!email) {
      res.status(404).json({ message: "Email inválido" })
    }
    if (!password) {
      res.status(404).json({ message: "Senha inválida" })
    } if (user) {
      res.status(404).json({ message: "usuário ja existe" })
    }
    else {
      const hashPassword = await bcrypt.hash(password, 10)
      try {
        const usuarioCriado = {
          email: req.body.email,
          password: hashPassword,
          regra: req.body.regra,
          paciente: {
            nome: req.body.paciente.nome,
            tipo: req.body.paciente.tipo,
            matricula: req.body.paciente.matricula,
            notificacoes: req.body.paciente.notificacoes,
            dataNascimento: req.body.paciente.dataNascimento,
          },
        }
        await Usuario.CriarUsuarioPaciente(usuarioCriado)
        res.status(200).json({ message: `usuario criado com sucesso!` });
      } catch (e) {
        res.status(400).json({ Erro: `Erro ao criar um usuario: ${e}` });
      }
    }
  }
};

export const get = async (req, res) => {
  try {
    const usuarios = await Usuario.ListarTodosUsuarios();
    if (usuarios.length === 0) {
      res
        .status(200)
        .json({ message: "Nenhuma usuario cadastrado no sistema" });
    } else res.status(200).send(usuarios);
  } catch (e) {
    res.status(400).send(`${e}`);
  }
};

export const getId = async (req, res) => {
  try {
    const usuario = await Usuario.BuscarUsuarioId(Number(req.params.id));
    if (!usuario) {
      res.status(404).json({ message: "Usuario não encontrado" }).send();
    } else {
      res.status(200).send(usuario);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
export const update = async (req, res) => {
  try {
    const usuario = await Usuario.BuscarUsuarioId(Number(req.params.id));
    if (!usuario) {
      res.status(400).json({ message: "Usuario não encontrado" }).send();
    } else {
      const usuarioAtualizado = await Usuario.AtualizarUsuario(Number(req.params.id), req.body)
      res.status(200).send(usuarioAtualizado);
    }
  } catch (e) {
    res.status(400).send(`${e}`);
  }
};

export const excluir = async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(req.params.id)
    }
  })
  try {
    if (!usuario) {
      res.status(400).json({ message: "usuario não encontrado" }).send();

    } else {
      await Usuario.ExcluirUsuario(Number(req.params.id));
      res.status(200).json({ message: "usuario excluido com sucesso" }).send();
    }

  } catch (e) {
    res.status(400).json(e);
  }
}



