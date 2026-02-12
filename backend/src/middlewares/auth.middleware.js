const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // El token suele venir en el header 'Authorization'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token de acceso' });
    }

    try {
        // Validamos el token con nuestra clave secreta
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado; // Guardamos los datos del usuario en la petición
        next(); // Continuamos al siguiente paso (el controlador)
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = verificarToken;
