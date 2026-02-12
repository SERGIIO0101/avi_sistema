const db = require('../config/db');

const Usuario = {
  crear: async (nombre, email, password) => {
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );
    return result.insertId;
  },

  buscarPorEmail: async (email) => {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  // ESTE MÉTODO ES VITAL PARA EL AUTHPROVIDER Y LA RUTA /PERFIL
  buscarPorId: async (id) => {
    const [rows] = await db.query(
      'SELECT id, nombre, email FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  listar: async () => {
    const [rows] = await db.query(
      'SELECT id, nombre, email FROM usuarios'
    );
    return rows;
  }
};

module.exports = Usuario;