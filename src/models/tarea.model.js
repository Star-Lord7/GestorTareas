import pool from '../config/database.js';

const getAllTareas = async () => {
    const [rows] = await pool.query(`
        SELECT
        t.id,
        t.titulo,
        t.contenido,
        u.nombre AS nombre_usuario
        FROM tareas t
        INNER JOIN usuarios u ON t.id_usuario = u.id
    `);
    return rows;
}

const getTareaById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
        t.id,
        t.titulo,
        t.contenido,
        u.nombre AS nombre_usuario
        FROM tareas t
        INNER JOIN usuarios u ON t.id_usuario = u.id
        WHERE t.id = ?
    `, [id]);
    return rows[0];
}

const createTarea = async (tarea) => {
  const { titulo, contenido, id_usuario } = tarea;
  const [result] = await pool.query(`
        INSERT INTO tareas (titulo, contenido, id_usuario)
        VALUES (?, ?, ?)
    `, [titulo, contenido, id_usuario]);
  return { id: result.insertId, data: result };
}

const updateTarea = async (id, tarea) => {
  const { titulo, contenido, id_usuario } = tarea;
  const [result] = await pool.query(`
        UPDATE tareas
        SET titulo = ?, contenido = ?, id_usuario = ?
        WHERE id = ?
    `, [titulo, contenido, id_usuario, id]);
  return result;
}

const deleteTarea = async (id) => {
  const [result] = await pool.query(`
        DELETE FROM tareas
        WHERE id = ?
    `, [id]);
  return result.affectedRows;
}

export {
    getAllTareas,
    getTareaById,
    createTarea,
    updateTarea,
    deleteTarea
}