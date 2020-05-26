/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 * Registrar al usuario, empezar a autenticarlo
 */
const express = require('express');
const router = express.Router();

/**
 *Esta ruta es para que el usuario pueda autenticar e ingresar a nuestra aplicacion
 *Vamos a renderizar el archivo signIN dentro de la carpeta users
 */
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

/**
 *Esta ruta es para que el usuario necesita para poder autenticarse, formulario de autenticacion
 *Vamos a renderizar el archivo signUP dentro de la carpeta users
 */
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});


module.exports = router;