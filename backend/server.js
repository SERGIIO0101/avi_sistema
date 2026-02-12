require('dotenv').config();
const app = require('./src/app');
const db = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Verifica la comunicación con la base de datos avicultura_db
        await db.query('SELECT 1');
        console.log('Conexion exitosa a MySQL (avicultura_db)');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutandose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
}

startServer();