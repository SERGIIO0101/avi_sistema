const db = require('../config/db');

const Lote = {
    crear: async (nombre, tipo_ave, cantidad_inicial, fecha_entrada, usuario_id) => {
        const query = `
            INSERT INTO lotes (nombre, tipo_ave, cantidad_inicial, fecha_entrada, usuario_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [nombre, tipo_ave, cantidad_inicial, fecha_entrada, usuario_id]);
        return result.insertId;
    },

    listarPorUsuario: async (usuario_id) => {
        const query = 'SELECT * FROM lotes WHERE usuario_id = ? ORDER BY created_at DESC';
        const [rows] = await db.execute(query, [usuario_id]);
        return rows;
    }
};

module.exports = Lote;