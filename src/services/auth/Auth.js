import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../services/prisma";
import jwt, { sign } from "jsonwebtoken";
const router = express();

const chaveSecreta = 'sasasAgenda'


function gerarToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, chaveSecreta, { expiresIn: '1h' });
}


function autenticacaoToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

router.post("/registrar", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const IsUsuario = await prisma.usuario.findUnique({ where: { email } });
    if (IsUsuario) {
      return res.status(400).json({ message: "Esse email já está registrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: { email, senha: hashedPassword },
    });
    res.json(novoUsuario);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erro interno" });
  }
});


router.post('/login')
