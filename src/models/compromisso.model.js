import { prisma } from "../services/prisma.js";
import Consulta from "./consulta.model.js";

class Compromisso {
    // async CriarCompromisso(data) {
    //     const compromisso = await prisma.compromisso.create({
    //         data: {

    //             tituloCompromisso: data.tituloCompromisso,
    //             dataCompromisso: new Date(data.dataCompromisso), // Certifique-se de converter a data corretamente
    //             horaInicio: new Date(data.horaInicio), // Horário de início
    //             horaFim: new Date(data.horaFim), // Horário de fim
    //             profissionalId: data.profissionalId, // ID do profissional de saúde

    //         },
    //         select: {
    //             id: true,
    //             tituloCompromisso: true,
    //             dataCompromisso: true,
    //             horaInicio: true,
    //             horaFim: true,
    //             profissionalId: true,
    //         }
    //     });

    //     return compromisso;
    // }



    async CriarCompromisso({ tituloCompromisso, dataCompromisso, horaInicio, horaFim, profissionalId }) {
        // Verificar se há conflitos
        const conflito = await this.verificarConflitoCompromisso(profissionalId, dataCompromisso, horaInicio, horaFim);

        if (conflito) {
            throw new Error('Conflito de compromisso detectado!');
        }

        // Se não houver conflito, criar o compromisso
        const novoCompromisso = await prisma.compromisso.create({
            data: {
                tituloCompromisso,
                dataCompromisso: new Date(dataCompromisso),
                horaInicio: new Date(horaInicio),
                horaFim: new Date(horaFim),
                profissionalId,
            },
        });

        return novoCompromisso;
    }


    async verificarConflitoCompromisso(profissionalId, dataCompromisso, horaInicio, horaFim) {
        const inicioNovoCompromisso = new Date(horaInicio);
        const fimNovoCompromisso = new Date(horaFim);

        // Definir início e fim do dia do compromisso
        const inicioDia = new Date(new Date(dataCompromisso).setHours(0, 0, 0, 0)); // Início do dia
        const fimDia = new Date(new Date(dataCompromisso).setHours(23, 59, 59, 999)); // Fim do dia

        // Busca compromissos no mesmo dia para o profissional
        const compromissos = await prisma.compromisso.findMany({
            where: {
                profissionalId: profissionalId,
                dataCompromisso: {
                    gte: inicioDia,  // Usar objeto Date para início do dia
                    lt: fimDia       // Usar objeto Date para fim do dia
                },
            },
        });

        // Verificar se há sobreposição de horários
        for (const compromisso of compromissos) {
            const inicioCompromissoExistente = new Date(compromisso.horaInicio);
            const fimCompromissoExistente = new Date(compromisso.horaFim);

            // Verificar se há sobreposição de horários
            const sobreposicao = (
                (inicioNovoCompromisso >= inicioCompromissoExistente && inicioNovoCompromisso < fimCompromissoExistente) ||  // Novo compromisso começa durante um existente
                (fimNovoCompromisso > inicioCompromissoExistente && fimNovoCompromisso <= fimCompromissoExistente) ||        // Novo compromisso termina durante um existente
                (inicioNovoCompromisso <= inicioCompromissoExistente && fimNovoCompromisso >= fimCompromissoExistente)       // Novo compromisso engloba completamente um existente
            );

            if (sobreposicao) {
                console.log('Conflito com Compromisso ID:', compromisso.id);
                return true; // Conflito detectado
            }
        }

        return false; // Nenhum conflito encontrado
    }



    async verificarConflitoEDisponibilidade(profissionalId, dataCompromisso, horaInicio, horaFim) {
        // Verificar conflito de compromisso
        const conflitoCompromisso = await this.verificarConflitoCompromisso(profissionalId, dataCompromisso, horaInicio, horaFim);

        // Verificar disponibilidade do profissional
        const disponibilidade = await Consulta.verificarDisponibilidade(profissionalId, dataCompromisso);

        // Retorna true apenas se não houver conflito e houver disponibilidade
        if (!conflitoCompromisso && disponibilidade) {
            return true; // Sem conflito e com disponibilidade
        } else {
            return false; // Existe conflito ou não há disponibilidade
        }
    }


    async ListarCompromissosPorProfissional(profissionalId) {
        const compromissos = await prisma.compromisso.findMany({
            where: {
                profissionalId: profissionalId,  // Filtra por profissionalId
            },
            select: {
                id: true,
                tituloCompromisso: true,
                dataCompromisso: true,
                horaInicio: true,
                horaFim: true,
            },
        });
        return compromissos;
    }

    async ProfissionalExiste(profissionalId) {
        const profissional = await prisma.profissionalSaude.findUnique({
            where: {
                id: profissionalId,
            },
        });
        return profissional !== null;
    }


    async CompromissoExiste(id) {
        const compromisso = await prisma.compromisso.findUnique({
            where: {
                id: id,
            },
        });
        return compromisso !== null;
    }

    async DeletarCompromisso(id) {
        try {
            const compromissoDeletado = await prisma.compromisso.delete({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    tituloCompromisso: true,
                    dataCompromisso: true,
                },
            });
            return compromissoDeletado;
        } catch (error) {
            throw new Error(`Erro ao deletar compromisso: ${error.message}`);
        }
    }
}

export default new Compromisso();