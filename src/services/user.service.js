import pool from '../config/database.js';

export const existUser = async (id) => {
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    return rows[0] || null;
}