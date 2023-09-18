import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from "../services/prisma.js";
import { generateToken } from './auth.mjs';

const router = express.Router();

// Rota para fazer login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.paciente.findUnique({
      where: { email },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
