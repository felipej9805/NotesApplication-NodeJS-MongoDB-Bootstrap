/**
 * Modulo me permite conectar a mongodb
 */
const mongoose = require('mongoose');

/**
 * Coenctarme a una direccion de internet, mongodb conectate a localhost y al nombre de la base de datos, si no existe
 * la crea
 * Objeto para configurarlo
 * userCreateIndex
 * useNewUrlParser
 * UseFindAndModify
 * Es tan solo para el funcionamiento de la biblioteca
 */
mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected...'))
.catch(err => console.error(err));

