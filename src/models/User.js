/**
 * Requiero mongoose, reqiero el modelo
 * importar mongoose
 * El esquema de los usuarios
 * El id cuando crea el objeto, tiene la fecha por defecto
 * Deberiamos cifrar las contraseñas
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

/**
 * Recibir una contraseña, cifrar la contraseña
 * Genera el hash y cuantas veces quiero que aplique el algoritmo
 * Hace la contraseña cifrada con el salt y el password
 */
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

/**
 * Tomar la contraseña y la compara con la bd
 * No utiliza => porque necesito que haga referencia a la contraseña del UserSchema
 * Mientras que esta funcion podemos acceder a las propiedades a travez del this
 */
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);