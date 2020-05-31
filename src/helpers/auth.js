/**
 * Objeto con multiples metodos
 */
const helpers = {};
/**
 * Comprobar si el usuario esta autenticado o no
 * Middleware que se ejecuta dependiendo de lo que le pasemos
 * Passport tiene un modulo que hace la autenticaciòn, si se ha logueado true
 */


helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin');
};

module.exports = helpers;