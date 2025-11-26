import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export const existUser = async (id) => {
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    return rows[0] || null;
}

export const getUserByEmail = async (correo) => {
    const [rows] = await pool.query('SELECT correo FROM usuarios WHERE correo = ?', [correo]);
    return rows[0] || null;
}

export const verifyPassword = async(correo, password) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if(rows[0]){
        const isMatch = await bcrypt.compare(password, rows[0].password);

        if(isMatch){
            return {
                id: rows[0].id,
                correo: rows[0].correo,
                name: rows[0].nombre
            }
        }
        return null;
    }
    return null;
}