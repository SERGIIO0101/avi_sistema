const Movimiento = require('../models/movimiento.model');

const movimientoController = {
    registrarMovimiento: async (req, res) => {
        try {
            const { tipo, categoria, monto, descripcion, fecha, lote_id } = req.body;

            if (!tipo || !categoria || !monto || !fecha || !lote_id) {
                return res.status(400).json({ message: 'Faltan datos financieros obligatorios' });
            }

            const id = await Movimiento.crear(tipo, categoria, monto, descripcion, fecha, lote_id);

            res.status(201).json({
                message: 'Movimiento financiero registrado',
                movimientoId: id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar el movimiento' });
        }
    },

    obtenerMovimientos: async (req, res) => {
        try {
            const { lote_id } = req.params;
            const movimientos = await Movimiento.listarPorLote(lote_id);
            res.json(movimientos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al consultar movimientos' });
        }
    }
};

module.exports = movimientoController;