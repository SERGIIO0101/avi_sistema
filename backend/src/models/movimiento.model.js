const db = require('../config/db');

const Movimiento = {
    crear: async (tipo, categoria, monto, descripcion, fecha, lote_id) => {
        const query = `
            INSERT INTO movimientos (tipo, categoria, monto, descripcion, fecha, lote_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [tipo, categoria, monto, descripcion, fecha, lote_id]);
        return result.insertId;
    },

    listarPorLote: async (lote_id) => {
        const query = 'SELECT * FROM movimientos WHERE lote_id = ? ORDER BY fecha DESC';
        const [rows] = await db.execute(query, [lote_id]);
        return rows;
    }
};

module.exports = Movimiento;