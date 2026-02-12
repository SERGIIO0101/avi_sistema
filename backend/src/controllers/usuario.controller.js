const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioController = {
    // Registro de nuevos usuarios
    crearUsuario: async (req, res) => {
        try {
            const { nombre, email, password } = req.body;

            if (!nombre || !email || !password) {
                return res.status(400).json({
                    message: 'Todos los campos son obligatorios'
                });
            }

            const usuarioExistente = await Usuario.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({
                    message: 'El correo ya está registrado'
                });
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const id = await Usuario.crear(nombre, email, passwordHash);

            res.status(201).json({
                message: 'Usuario registrado',
                id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Inicio de sesión
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.buscarPorEmail(email);
            if (!usuario) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const passwordCorrecto = await bcrypt.compare(password, usuario.password);
            if (!passwordCorrecto) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.json({
                message: 'Autenticación exitosa',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno' });
        }
    },

    // Obtener estadísticas para el Dashboard (GRÁFICOS Y MÉTRICAS)
    obtenerEstadisticas: async (req, res) => {
        try {
            // Datos temporales que alimentan el Dashboard.jsx
            // En la siguiente fase, estos vendrán de consultas SQL a tus tablas de producción.
            res.json({
                metricas: [
                    { label: 'Poblacion Total', valor: '12,500', sub: 'Aves activas', color: 'text-neutral-900', p: 85 },
                    { label: 'Mortalidad Lote', valor: '0.05%', sub: 'Bajo el umbral', color: 'text-red-600', p: 15 },
                    { label: 'Conversión Alimento', valor: '1.42', sub: 'Eficiencia FCR', color: 'text-emerald-600', p: 90 }
                ],
                grafico: [
                    { dia: 'Sem 1', peso: 0.5 }, 
                    { dia: 'Sem 2', peso: 1.1 }, 
                    { dia: 'Sem 3', peso: 1.6 },
                    { dia: 'Sem 4', peso: 2.0 }, 
                    { dia: 'Sem 5', peso: 2.4 }
                ]
            });
        } catch (error) {
            console.error("Error en obtenerEstadisticas:", error);
            res.status(500).json({ message: 'Error al procesar estadísticas' });
        }
    },

    // Validar sesión al recargar la página
    perfil: async (req, res) => {
        try {
            const usuario = await Usuario.buscarPorId(req.usuario.id);
            
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el perfil' });
        }
    },

    // Listar todos los usuarios
    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.listar();
            res.json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = usuarioController;