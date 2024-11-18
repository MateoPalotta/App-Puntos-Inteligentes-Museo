const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/routes', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                gr.id,
                gr.name,
                gr.description,
                GROUP_CONCAT(r.name ORDER BY rp.order_num) as room_sequence
            FROM guided_routes gr
            LEFT JOIN route_points rp ON gr.id = rp.route_id
            LEFT JOIN rooms r ON rp.room_id = r.id
            GROUP BY gr.id
        `);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron rutas' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener rutas:', error);
        res.status(500).json({ 
            message: 'Error al obtener las rutas',
            error: error.message 
        });
    }
});

module.exports = router; 