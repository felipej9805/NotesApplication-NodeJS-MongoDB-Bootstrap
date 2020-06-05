/**
 * Modulo me permite conectar a mongodb
 */
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://root:password@cluster0-fvw5p.mongodb.net/notes-db-app?retryWrites=true&w=majority';

//const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/notes-db-app';
/**
 * Coenctarme a una direccion de internet, mongodb conectate a localhost y al nombre de la base de datos, si no existe
 * la crea
 * Objeto para configurarlo
 * userCreateIndex
 * useNewUrlParser
 * UseFindAndModify
 * Es tan solo para el funcionamiento de la biblioteca
 */
mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

})
.then(db => console.log('DB is connected...'))
.catch(err => console.error(err));

