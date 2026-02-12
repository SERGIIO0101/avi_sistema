const Lote = require('../models/lote.model');

const loteController = {
    nuevoLote: async (req, res) => {
        try {
            const { nombre, tipo_ave, cantidad_inicial, fecha_entrada } = req.body;
            // El ID viene del Token verificado
            const usuario_id = req.usuario.id;

            if (!nombre || !tipo_ave || !cantidad_inicial || !fecha_entrada) {
                return res.status(400).json({ message: 'Información del lote incompleta' });
            }

            const id = await Lote.crear(nombre, tipo_ave, cantidad_inicial, fecha_entrada, usuario_id);

            res.status(201).json({
                message: 'Lote registrado exitosamente',
                loteId: id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar lote' });
        }
    },

    obtenerLotes: async (req, res) => {
        try {
            const usuario_id = req.usuario.id;
            const lotes = await Lote.listarPorUsuario(usuario_id);
            res.json(lotes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener lotes' });
        }
    }
};

module.exports = loteController;