/**
 * Voy a utilziar una manera de autenticar al usuario. Google, twitter. en este caso local
 * definir una nueva estrategia de autenticacion y le digo los parametros que me envia el usuario
 * Vamos a validar el correo
 * Requiero el modelo User, quiero buscar el correo que le pasa el usuario. Si no existe el usuario, correo invalido, el callback
 * done sirve para terminar el proceso de autenticacion: error, ningun usuario o mensaje de error
 * El primer dato es para un error, null ningun error, false ningun usuario
 * Si existe, ahora vamos a validar la contraseña
 * Luego si la contraseña no es igual, envia un mensaje
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'Not user found' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else {
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}

));
/**
 * Tomar un usuario, y tomar un callback, ejecutarlo con un error null pero con el usuario id.logo
 * Al momento que se autentique, almacenamos el id del usuario, para cada vez que visite una pagina no tenga que autenticarse
 * 
 */
passport.serializeUser((user,done) => {
    done(null, user.id);
});


/**
 * Toma un id y un callback, busqueda en la base de datos, y tomar el id de la sesion y retornamos el eror y el usuario
 * Si hay un usuario en la sesion
 * Si lo encuentro, lo retorno
 */
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,user)
    });
});