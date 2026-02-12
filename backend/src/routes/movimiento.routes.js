const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');
const verificarToken = require('../middlewares/auth.middleware');

// Protección global para finanzas
router.use(verificarToken);

router.post('/', movimientoController.registrarMovimiento);
router.get('/:lote_id', movimientoController.obtenerMovimientos);

module.exports = router;