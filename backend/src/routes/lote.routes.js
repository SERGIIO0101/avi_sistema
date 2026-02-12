const express = require('express');
const router = express.Router();
const loteController = require('../controllers/lote.controller');
const verificarToken = require('../middlewares/auth.middleware');

// Todas las rutas de lotes requieren autenticación
router.use(verificarToken);

router.post('/', loteController.nuevoLote);
router.get('/', loteController.obtenerLotes);

module.exports = router;