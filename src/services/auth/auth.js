import jwt from 'jsonwebtoken';
import { prisma } from "./../../services/prisma"
import bcrypt from 'bcrypt'

export function gerarToken(usuarioId, regra) {
    const payload = {
        id: usuarioId,
        regra: regra
    }
    const secret = process.env.SECRET

    const token = jwt.sign(payload, secret)
    return token
}

export function checkAdm(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(" ")[1]
    if (!token)
        return res.status(401).json({
            message: "Acesso negado"
        })
    try {
        const secret = process.env.SECRET
        const decoded = jwt.verify(token, secret)
        console.log(decoded)

        const regraUsuario = decoded.regra

        if (regraUsuario === 'administrador') {
            next()
        } else {
            return res.status(403).json({ message: "acesso não autorizado!" })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Token inválido" })

    }
}

export function checkPsi(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(" ")[1]
    if (!token)
        return res.status(401).json({
            message: "Acesso negado"
        })

    try {
        const secret = process.env.SECRET
        const decoded = jwt.verify(token, secret)
        console.log(decoded)

        const regraUsuario = decoded.regra

        if (regraUsuario === 'psicologo') {
            next()
        } else {
            return res.status(403).json({ message: "acesso não autorizado!" })
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Token inválido" })

    }
}

import jwt from 'jsonwebtoken';

export function checkPac(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                message: "Acesso negado. Token ausente."
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Acesso negado. Token ausente ou malformado."
            });
        }

        const secret = process.env.SECRET;

        try {
            const decoded = jwt.verify(token, secret);
            console.log(decoded);

            if (!decoded || !decoded.regra) {
                return res.status(401).json({ message: "Token inválido" });
            }

            const regraUsuario = decoded.regra;

            if (regraUsuario === 'paciente') {
                next();
            } else {
                return res.status(403).json({ message: "Acesso não autorizado!" });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Token inválido" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

export const logar = async (req, res) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }


        const usuario = await prisma.usuario.findUnique({
            where: {
                email
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
                        usuarioId: true
                    }
                }
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Email ou senha inválidos" });
        }

        const checkPassword = await bcrypt.compare(password, usuario.password);

        if (!checkPassword) {
            return res.status(404).json({ message: "Email ou senha inválidos" });
        }

        const regra = usuario.regra;
        const token = gerarToken(usuario.id, regra);

        return res.status(200).json({ message: "Autenticado com sucesso", token, usuario });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};
