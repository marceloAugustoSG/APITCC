import { z } from "zod";

export const schemaProfissional = z.object({
  nome: z
    .string({
      required_error: "nome é requerido",
    })
    .min(1, { message: "Campo nome não pode ser vazio" }),
  email: z
    .string({ required_error: "Email requerido" })
    .min(1, { message: "Campo email não pode ser vazio" })
    .email({ message: "Este campo precisa ser um email" }),
});
