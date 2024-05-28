import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  data: z
    .string({ required_error: "Campo data requerido" })
    .datetime({ message: "insira uma data válida" }),
  profissionalId: z.number({
    required_error: "Campo de id do profissional requerido",
  }),
});
