/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 */
const express = require('express');
const router = express.Router();


/**
 * Cuando visiten la pag principal, una funcion que envia un mensaje index por ahora, luego por un archivo
 * Como respuesta, renderiza o envia este archivo
 */
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;