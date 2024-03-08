import jwt from "jsonwebtoken";
import { prisma } from "./../../services/prisma.js";
import bcrypt from "bcrypt";

export function gerarToken(usuarioId, regra) {
  const payload = {
    id: usuarioId,
    regra: regra,
  };
  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret);
  return token;
}

//middleware de checagem se o usuario é um admistrador
export function checkAdm(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "Acesso negado",
    });
  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    console.log(decoded);

    const regraUsuario = decoded.regra;

    if (regraUsuario === "administrador") {
      next();
    } else {
      return res.status(403).json({ message: "acesso não autorizado!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Token inválido" });
  }
}
//middleware de checagem se o usuario é um psicologo
export function checkPsi(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "Acesso negado",
    });

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    console.log(decoded);

    const regraUsuario = decoded.regra;

    if (regraUsuario === "psicologo") {
      next();
    } else {
      return res.status(403).json({ message: "acesso não autorizado!" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token inválido" });
  }
}

//middleware de checagem se o usuario é um paciente

export function checkPac(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json({
        message: "Acesso negado. Token ausente.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Acesso negado. Token ausente ou malformado.",
      });
      return;
    }

    const secret = process.env.SECRET;

    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);

      if (!decoded || !decoded.regra) {
        res.status(401).json({ message: "Token inválido" });
        return;
      }

      const regraUsuario = decoded.regra;

      if (regraUsuario === "paciente") {
        next();
      } else {
        res.status(403).json({ message: "Acesso não autorizado!" });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token inválido" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
}

export const logar = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    //verificando se existe email ou senha

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    //encontrando o usuario
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        regra: true,
        paciente: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            matricula: true,
            consultas: true,
            dataNascimento: true,
            usuarioId: true,
          },
        },
      },
    });

    //se o usuario nao for encontrado

    if (!usuario) {
      res.status(404).json({ message: "Usuario não encontrado" });
      return;
    }

    //comparando a senha com a senha encriptada
    const checkPassword = await bcrypt.compare(password, usuario.password);
    //verificando se há senha
    if (!checkPassword) {
      res.status(404).json({ message: "Email ou senha inválidos" });
      return;
    }

    //pegando a senha do usuario e gerando o token com o id e regra do usuario
    const regra = usuario.regra;
    const token = gerarToken(usuario.id, regra);
    //enviando o token
    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};
