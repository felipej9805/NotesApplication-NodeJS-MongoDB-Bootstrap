const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const Handlebars = require('handlebars')
const flash = require('connect-flash');
const passport = require('passport');
require("dotenv").config();  


//Initialization *****************************************************************************
const app = express();
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
require('./database');
require('./config/passport');

//Settings************************************************************************************
app.set('port', process.env.PORT || 3000);

/**
 * Metodo join() me permite unir directorios, _dirname me devuelve la ruta de en donde se esta ejecutando cierto archivo
 * Esta linea me sirve para decirle a node en donde esta la carpeta views, porque ahi iran nuestros archivos html * 
 */
app.set('views', path.join(__dirname, 'views'));

/**
 * El nombre de como seran llamados los archivos de las vistas, estas propiedades sirven para saber de que manera
 * vamos a utilizar las vistas
 * Vamos a tener muchas vistas y van a tener cosas en comun, para no estas escribiendo en todas las paginas
 * defaultlayout: Archivo principal, creamos la carpeta layout/main.hbs
 * layoutsDir: Obten la direccion de views y concatenar con layouts
 * partialsDir: Concatenamos la carpeta partials
 * extname: Que extension tendran nuestros archivos
 * 
 */
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');




//Middlewares*******************************************************************************

/**
 *Sirve para que un formulario quiera enviarme cierto dato, puedo entenderlo. El correo yo quiero recibir esos datos
 * Opcion extended false: No voy aceptar imagenes, solo quiero sus datos 
 */
app.use(express.urlencoded({extended: false}));

/**
 * Middleware de express. Utiliza eso, decirle a travez de que input los formularios nos enviaran otros metodos
 * Los formularios peudan enviar otros tipos de metodos, como put o delete, input oculto 
 * Este modul ose e encarga de revisar este input oculto, lo valide como una pteicion PUt o DELETE en este caso, PUT
 */
app.use(methodOverride('_method'));


/**
 * Secret: palabra secreta, que solo nosotros sepamos
 * resave: true --> por defecto
 * saveUninitialized: True
 * Autenticar al usuario y almacenar esos datos temporalmente
 */
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());
/**
 * Me permite enviar mensajes entre multiples vistas, para mostrarles mensajes a los usuarios
 * 
 */
app.use(flash());


//Global Variables ***************************************************************************
/**
 * Yo quiero que toda las vistas tengan esos mensajes flash
 * Guardar un dato de manera global, tener mensajes de exito y de error. Esta variable almacena los mensajes que se llamen
 * success_msg y error_msg
 */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ;

    next();
});



//Routes *************************************************************************************
/**
 * Se crean tres archivos en la carpeta routes(index.js, notes.js, users.js) Iran las rutas 
 * 
 * index.js: URL de mi pagina web, principal, cualquier persona pueda acceder
 * user.js: Para que el usuario pueda crear, eliminar,actualizar una nueva nota
 * notes.js: URL donde el se puede autenticar
 * 
 */

 /**
  * Hacerle saber a mi servidor que aqui estan mis rutas de mi servidor
  * Vamos a ir a los archivos para no dejarlos vacios
  */
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//Static Files********************************************************************************

/**
 * Empezar a configurar los archivos estaticos, la carpeta public
 * La carpeta public esta en esa ruta.
 */
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening**************************************************************************
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});