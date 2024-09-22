import Compromisso from '../models/compromisso.model.js';
import { formatDate } from "../services/Date/Date.js";

export const create = async (req, res) => {
    try {
        // Pegando os dados enviados na requisição
        const dadosCompromisso = req.body;

        console.log(dadosCompromisso)

        // Criando o compromisso
        const compromisso = await Compromisso.CriarCompromisso(dadosCompromisso);

        // Formatando as datas para exibição (opcional)
        const dataFormatadaInicio = formatDate(compromisso.horaInicio);
        const dataFormatadaFim = formatDate(compromisso.horaFim);

        // Respondendo com sucesso e retornando o compromisso criado
        res.status(200).json({
            message: "Compromisso criado com sucesso",
            compromisso: {
                ...compromisso,
                horaInicio: dataFormatadaInicio,
                horaFim: dataFormatadaFim,
            },
        });
    } catch (e) {
        console.error(e);
        // Resposta de erro em caso de exceção
        res.status(400).json({ message: "Erro ao criar o compromisso", error: e.message });
    }
};




export const listarCompromissosPorProfissional = async (req, res) => {
    const { profissionalId } = req.params;  // Pega o id do profissional da URL

    // Valida se o id é um número
    const id = parseInt(profissionalId, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID do profissional inválido" });
    }

    try {
        // Verifica se o profissional existe
        const profissionalExiste = await Compromisso.ProfissionalExiste(id);
        if (!profissionalExiste) {
            return res.status(404).json({ message: "Profissional da saúde não encontrado" });
        }

        // Lista os compromissos do profissional
        const compromissos = await Compromisso.ListarCompromissosPorProfissional(id);
        res.status(200).json(compromissos);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: "Erro ao listar os compromissos", error: e.message });
    }
};


export const deletarCompromisso = async (req, res) => {
    const { id } = req.params;  // Pega o id do compromisso da URL

    // Valida se o id é um número


    try {
        // Verifica se o compromisso existe
        const compromissoExiste = await Compromisso.CompromissoExiste(Number(id));
        if (!compromissoExiste) {
            return res.status(404).json({ message: "Compromisso não encontrado" });
        }

        // Deleta o compromisso
        const compromissoDeletado = await Compromisso.DeletarCompromisso(Number(id));
        res.status(200).json({ message: "Compromisso deletado com sucesso", compromisso: compromissoDeletado });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro ao deletar o compromisso", error: error.message });
    }
};