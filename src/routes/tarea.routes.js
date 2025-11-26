import express from 'express';
import { validateSchema } from '../middleware/validator.middleware.js';
import { createTareaSchema } from '../schemas/tarea.schema.js';
import { addTarea, editTarea, getTarea, getTareas, removeTarea } from '../controllers/tarea.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getTareas);
router.get('/:id', getTarea);
router.post('/', verifyToken, validateSchema(createTareaSchema), addTarea);
router.put('/:id', editTarea);
router.delete('/:id', removeTarea);

export default router;