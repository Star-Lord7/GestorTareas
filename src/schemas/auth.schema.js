import { z } from 'zod';
import { getUserByEmail, verifyPassword } from '../services/user.service.js';

export const loginSchema = z.object({
    correo: z
    .string('El correo electrónico es obligatorio')
    .email({ message: "Correo electrónico inválido" }),
    password: z
    .string('La contraseña es obligatoria')
})
.superRefine( async (data, ctx) => {
    const user =  await getUserByEmail(data.correo);
    if (!user) {
        ctx.addIssue({
            code: "custom",
            path: ['correo', "password"],
            message: 'Correo electrónico o contraseña incorrectos'
        });
    }

    const validPassword = await verifyPassword(data.correo, data.password);
    console.log(validPassword);
    if (!validPassword) {
        ctx.addIssue({
            code: "custom",
            path: ['correo', "password"],
            message: 'Correo electrónico o contraseña incorrectos_'
        });
    }
});