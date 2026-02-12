const express = require('express');
const axios = require('axios'); // Asegúrate de haber hecho: npm install axios

const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY; 
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

router.get('/', async (req, res) => {
    try {
        if (!NEWS_API_KEY) {
            return res.status(500).json({ 
                msg: "Configuración de API de noticias ausente" 
            });
        }

        const response = await axios.get(NEWS_API_URL, {
            params: {
                q: 'avicultura OR "producción avícola" OR "poultry industry"',
                sortBy: 'publishedAt',
                language: 'es', 
                pageSize: 6,
                apiKey: NEWS_API_KEY
            },
            timeout: 5000
        });

        const noticiasValidas = response.data.articles
            .filter(art => art.title !== "[Removed]" && art.description !== null)
            .slice(0, 3) 
            .map(art => ({
                fuente: art.source.name,
                titulo: art.title,
                descripcion: art.description,
                url: art.url,
                imagen: art.urlToImage,
                tiempo: art.publishedAt
            }));

        res.json(noticiasValidas);

    } catch (error) {
        console.error("Error NewsAPI:", error.response?.data || error.message);
        res.status(500).json({ 
            msg: "No se pudieron sincronizar las noticias",
            error: error.message 
        });
    }
});

module.exports = router;