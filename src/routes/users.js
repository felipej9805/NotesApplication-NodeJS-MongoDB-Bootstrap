/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 * Registrar al usuario, empezar a autenticarlo
 */
const express = require('express');
const router = express.Router();

/**
 *Esta ruta es para que el usuario pueda autenticar e ingresar a nuestra aplicacion
 */
router.get('/users/signin', (req, res) => {
    res.send('Ingresando a la app');
});

/**
 *Esta ruta es para que el usuario necesita para poder autenticarse, formulario de autenticacion
 */
router.get('/users/signup', (req, res) => {
    res.send('Formulario de autenticacion');
});


module.exports = router;