import { z } from "zod";

export const schemaPaciente = z.object({
  nome: z.string(),
  tipo: z.string(),
  matricula: z.string().min(8),
  dataNascimento: z
    .string({ required_error: "Campo data requerido" })
    .datetime({ message: "insira uma data válida" }),
  telefone: z.string(),
});
