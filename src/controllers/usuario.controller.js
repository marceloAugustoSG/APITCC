import { number } from "yup";
import { createUsuario, getAll, deletarUsuario, getById } from "../models/usuario.model.js";
import { prisma } from "../services/prisma.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const create = async (req, res) => {

  const { email, password } = req.body

  const user = await prisma.usuario.findUnique({
    where: {
      email
    }
  })

  if (!email) {
    res.status(404).json({ message: "Email inválida" })
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
          matricula: req.body.Paciente.matricula
        }
      }

      const usuario = await createUsuario(usuarioCriado)
      console.log(req.body)

      res.status(200).send(usuario);
    } catch (e) {
      res.status(400).json({ Erro: "Erro ao criar um usuario: " + e });
    }
  }
};

export const get = async (req, res) => {
  try {
    const usuarios = await getAll();
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
    const usuario = await getById(Number(req.params.id));
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
    const usuario = await updatePaciente(Number(req.params.id), req.body);
    if (!usuario) {
      res.status(400).json({ message: "Usuario não encontrado" }).send();
    } else {
      res.status(200).send(usuario);
    }
  } catch (e) {
    res.status(400).send(e);
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
      await deletarUsuario(Number(req.params.id));
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
  const { email, password } = req.body
  //verificando campos
  if (!email) {
    res.status(404).json({ message: "o email é obrigatório" }).send();
  }
  if (!password) {
    res.status(404).json({ message: "A senha é obrigatória" }).send();
  }
  //Verificando usuario
  const usuario = await prisma.usuario.findUnique({
    where: {
      email
    }
  })
  if (!usuario) {
    res.status(404).json({ message: "usuário não encontrado" }).send();
  }
  const checkPassword = await bcrypt.compare(password, usuario.password)
  if (!checkPassword) {
    res.status(404).json({ message: "Senha inválida" }).send();
  }
  try {
    const secret = process.env.SECRET
    const token = jwt.sign({
      id: usuario.id
    }, secret)
    res.status(200).json({ message: "Autenticação realizada com sucesso!! ", token }).send();
  } catch (e) {
    res.status(500).json({ message: "Aconteceu um erro no servidor,tente novamente mais tarde" })
  }
}