/**
 * Moongose para crear esquema de datos
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Definir como van a lucir mis notas, que propiedaes van a tener
 * Fecha por defecto, si no se le pasa ningun dato. Aun no sabe como crear el modelo
 */
const NoteSchema = new Schema ({
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: {type: Date, default: Date.now},
    user: { type: String}
});


 /**
  * Utilizar ese modelo en otras partes de la app, necesito la nota y el esquema.
  */
module.exports = mongoose.model('Note', NoteSchema);

