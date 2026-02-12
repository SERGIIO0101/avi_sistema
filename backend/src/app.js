const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importación de Rutas
const usuarioRoutes = require('./routes/usuario.routes');
const loteRoutes = require('./routes/lote.routes');
const noticiasRoutes = require('./routes/news'); // <--- IMPORTANTE: Importar noticias

// Definición de Endpoints
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/lotes', loteRoutes);
app.use('/api/movimientos', require('./routes/movimiento.routes'));
app.use('/api/noticias', noticiasRoutes); // <--- IMPORTANTE: Registrar noticias

// --- RUTA TEMPORAL PARA ESTADÍSTICAS DEL DASHBOARD ---
// (Esto evitará el 404 mientras creas la lógica real en el controlador)
app.get('/api/usuarios/dashboard-stats', (req, res) => {
    res.json({
        metricas: [
            { label: 'Poblacion Total', valor: '12,500', sub: 'Aves activas', color: 'text-neutral-900', p: 85, trend: '+2%' },
            { label: 'Mortalidad Lote', valor: '0.05%', sub: 'Bajo el umbral', color: 'text-red-600', p: 15, trend: '-0.01%' },
            { label: 'Conversión Alimento', valor: '1.42', sub: 'Eficiencia FCR', color: 'text-emerald-600', p: 90, trend: 'Óptimo' }
        ],
        grafico: [
            { dia: 'Sem 1', peso: 0.5 }, { dia: 'Sem 2', peso: 1.1 }, { dia: 'Sem 3', peso: 1.6 },
            { dia: 'Sem 4', peso: 2.0 }, { dia: 'Sem 5', peso: 2.4 }
        ]
    });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Avicultura funcionando correctamente' });
});

module.exports = app;