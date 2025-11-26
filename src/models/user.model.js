import pool from '../config/database.js';

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};