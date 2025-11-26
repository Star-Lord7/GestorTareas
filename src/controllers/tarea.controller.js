import * as Tarea from '../models/tarea.model.js';

const getTareas = async (req, res) => {
    try {
        const dataTareas = await Tarea.getAllTareas();
        res.status(200).json({
        message: "Las Tareas han sido obtenidas exitosamente",
        data: dataTareas
    });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las Tareas', error });
    }
}

const getTarea = async (req, res) => {
    try {
        const tarea = await Tarea.getTareaById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrado' });
        }
        res.status(200).json({
            message: "La Tarea ha sido obtenido exitosamente",
            data: tarea
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la Tarea', error });
    }
}

const addTarea = async (req, res) => {
    try {
        const tarea = await Tarea.createTarea(req.body);
        res.status(201).json({
            message: "La Tarea ha sido creado exitosamente",
            data: tarea
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la Tarea', error });
    }
}

const editTarea = async (req, res) => {
    try {
        const tarea = await Tarea.updateTarea(req.params.id, req.body);

        res.status(200).json({
            message: "La Tarea ha sido actualizado exitosamente",
            data: tarea
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la Tarea', error });
    }   
}

const removeTarea = async (req, res) => {
    try {
        await Tarea.deleteTarea(req.params.id);
        res.status(200).json({
            message: "La Tarea ha sido eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la Tarea', error });
    }
}

export {
    getTareas,
    getTarea,
    addTarea,
    editTarea,
    removeTarea
}