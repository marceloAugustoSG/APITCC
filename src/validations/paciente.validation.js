import * as yup from 'yup'

export const pacienteValidation = yup.object({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    telefone: yup.string().nullable(true),

})