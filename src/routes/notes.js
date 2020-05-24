/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 */
const express = require('express');
const router = express.Router();


/**
 *Esta ruta es para devolver todas las notas que un usuario ha creado
 */
router.get('/notes', (req, res) => {
    res.send('Notas desde la base de datos');
});


module.exports = router;