/**
 * Modulo me permite conectar a mongodb
 */
const mongoose = require('mongoose');
const MONGO_URL='mongodb://172.17.0.2/notes-db-app';

/**
 * Coenctarme a una direccion de internet, mongodb conectate a localhost y al nombre de la base de datos, si no existe
 * la crea
 * Objeto para configurarlo
 * userCreateIndex
 * useNewUrlParser
 * UseFindAndModify
 * Es tan solo para el funcionamiento de la biblioteca
 */
mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

})
.then(db => console.log('DB is connected...'))
.catch(err => console.error(err));

