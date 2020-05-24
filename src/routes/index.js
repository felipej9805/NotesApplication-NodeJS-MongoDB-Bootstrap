/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 */
const express = require('express');
const router = express.Router();


/**
 * Cuando visiten la pag principal, una funcion que envia un mensaje index por ahora, luego por un archivo
 */
router.get('/', (req, res) => {
    res.send('Index');
});

router.get('/about', (req, res) => {
    res.send('About');
});


module.exports = router;