import { z } from "zod";

export const schemaProfissional = z.object({
  nome: z.string({
    required_error: "Campo nome requerido",
    description: "Campo nome",
    invalid_type_error: "Campo nonme não é string",
  }),
  especialidade: z.string({
    required_error: "Campo especialidade requerido",
    description: "campo espcialidade",
    invalid_type_error: "Campo especialidade não é string",
  }),
  email: z
    .string({
      required_error: "campo email requerido",
      description: "campo de email",
    })
    .email({ message: "email requerido" }),
  telefone: z.string({
    required_error: "Campo de telefone requerido",
  }),
});
