import express from "express";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import { prisma } from "../services/prisma";

const router = express();

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
