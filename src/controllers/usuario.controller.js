import Usuario from "../models/usuario.model.js";
import { prisma } from "../services/prisma.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const create = async (req, res) => {

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
          email,
          password: hashPassword,
          Paciente: {
            nome: req.body.Paciente.nome,
            tipo: req.body.Paciente.tipo,
            matricula: req.body.Paciente.matricula,
            dataNascimento: req.body.Paciente.dataNascimento
          }
        }
        await Usuario.create(usuarioCriado)
        res.status(200).json({ message: `usuario criado com sucesso!` });
      } catch (e) {
        res.status(400).json({ Erro: `Erro ao criar um usuario: ${e}` });
      }
    }
  }
};

export const get = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
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
    const usuario = await Usuario.getById(Number(req.params.id));
    if (!usuario) {
      res.status(400).json({ message: "Usuario não encontrado" }).send();
    } else {
      res.status(200).send(usuario);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const usuario = await Usuario.update(Number(req.params.id), req.body);
    if (!usuario) {
      res.status(400).json({ message: "Usuario não encontrado" }).send();
    } else {
      res.status(200).send(usuario);
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
      await Usuario.delete(Number(req.params.id));
      res.status(200).json({ message: "usuario excluido com sucesso" }).send();
    }

  } catch (e) {
    res.status(400).json(e);
  }
}

export function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(" ")[1]
  if (!token)
    return res.status(401).json({
      message: "Acesso negado"
    })

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()

  } catch (error) {
    res.status(400).json({ message: "Token inválido" })

  }
}

export const logar = async (req, res) => {
  try {
    const { email, password } = req.body
    const usuario = await prisma.usuario.findUnique({
      where: {
        email
      }, select: {
        id: true,
        email: true,
        password: true,
        Paciente: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            matricula: true,
            consultas: true
          }
        }
      }
    })
    if (!email) {
      res.status(404).json({ message: "email vazio" })
    }

    if (!password) {
      res.status(404).json({ message: "Senha vazia" })
    }

    if (!usuario) {
      res.status(404).json({ message: "usuario não encontrado" })
    }

    const checkPassword = await bcrypt.compare(password, usuario.password)
    if (!checkPassword) {
      res.status(404).json({ message: "Senha inválida" })
    }
    const secret = process.env.SECRET
    const token = jwt.sign({
      id: usuario.id
    }, secret)
    res.status(200).json({ message: "Autenticado com sucesso", token, usuario })
  } catch (error) {
    return
  }
}
