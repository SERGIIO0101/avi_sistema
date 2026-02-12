const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verificarToken = require('../middlewares/auth.middleware');

// ==========================================
// RUTAS PÚBLICAS
// ==========================================

// Registro de nuevos usuarios
router.post('/', usuarioController.crearUsuario);

// Inicio de sesión (Genera el token y devuelve datos del usuario)
router.post('/login', usuarioController.login);


// ==========================================
// RUTAS PRIVADAS (Requieren Token)
// ==========================================

/**
 * @route   GET /api/usuarios/dashboard-stats
 * @desc    Obtener métricas y datos del gráfico para el Dashboard
 * @access  Privada
 */
router.get('/dashboard-stats', verificarToken, usuarioController.obtenerEstadisticas);

// Obtener los datos del usuario autenticado (USADA POR EL AUTHPROVIDER)
router.get('/perfil', verificarToken, usuarioController.perfil);

// Listar todos los usuarios (Gestión administrativa)
router.get('/', verificarToken, usuarioController.listarUsuarios);

module.exports = router;