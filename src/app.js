import express from 'express';
import cors from 'cors';
import tareaRoutes from './routes/tarea.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/tareas', tareaRoutes);

export default app;