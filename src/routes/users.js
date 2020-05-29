/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 * Registrar al usuario, empezar a autenticarlo
 */
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');

/**
 *Esta ruta es para que el usuario pueda ingregsar e ingresar a nuestra aplicacion
 *Vamos a renderizar el archivo signIN dentro de la carpeta users
 */
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

/**
 * Desde la ruta  signin, voy a tratar de autenticar al usuario
 * Hemos creado una estrategia de autenticacion
 * local --> Nombre de autenticacion es local
 * Y va llamar lo del passport
 * failure flash: Enviarle los mensajes
 */
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

/**
 *Esta ruta es para que el usuario necesita para poder registrarse, formulario de autenticacion
 *Vamos a renderizar el archivo signUP dentro de la carpeta users
 */
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});




/**
 * Recibir los datos del signup
 * Desde req.body quiero guardar estos datos en una variable, de los datos que me envia el usuario en el signup
 * Arreglo que almacena los errores
 * En caso que hayan errores, render a la pagina y le pasamos los errores con los datos que ya el usuario habi escrito
 * No tenemos que volver a recorrer el errors, 
 */
router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (name.length <= 0) {
        errors.push({ text: 'Please insert your name' });
    }

    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }

    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }


    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }

        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');

    }

});


module.exports = router;