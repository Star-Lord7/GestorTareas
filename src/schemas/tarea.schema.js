import { z } from 'zod';
import { existUser } from '../services/user.service.js';

export const createTareaSchema = z.object({
    titulo: z
        .string('El titulo es obligatorio')
        .min(3, 'El titulo debe tener al menos 10 caracteres'),
    contenido: z
        .string('El contenido es obligatorio')
        .min(50, 'El contenido debe tener al menos 50 caracteres'),
    id_usuario: z
        .coerce
        .number('El usuario es obligatorio')
        .int('El usuario no tiene el formato valido'),
})
.superRefine(async(data, ctx) => {
    const userExist = await existUser(data.id_usuario);
    if(!userExist){
        ctx.addIssue({
            code: "custom",
            message: 'El usuario no existe',
            path: ['id_usuario']
        })
    }
});