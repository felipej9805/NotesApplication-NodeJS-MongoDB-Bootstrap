/**
 * Requerir express para crear rutas
 * Me permite tener un objeto que me facilita la creacion de rutas del servidor
 */
const express = require("express");
const router = express.Router();

/**
 * Gracias a este Note voy a utilizar sus metodos, para poder guardar, generar nuevos datos. Es constante es una clase
 * Y la tenemos que instanciar
 */
const Note = require("../models/Note");
/**
 * Ruta que le permita al usuario ver el formulario, que vea el formulario en esta ruta
 * Entra a la carpeta notes/ y toma el archivo new-note
 */
router.get("/notes/add", (req, res) => {
    res.render("notes/new-note");
});

/**
 * Ruta para recibir los datos, el formulario me envia a esta ruta por metodo POST
 * Y si existe algun error en uno de los campos, muestra un mensaje, y si todo esta bien, los almacena en la BD
 * La palabra clave async le dice a la funcion que habran procesos asincronos
 */
router.post("/notes/new-note", async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a title" });
    }

    if (!description) {
        errors.push({ text: "Please Write a description" });
    }
    if (errors.length > 0) {
        res.render("notes/new-note", {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({ title, description });
        /**
         * Cuando operamos con una bd, no sabemos cuando va terminar, node asincrono, muchas tareas a medida que otros procesos terminan
         * Guarda dentro de mongo db, y toma algunos segundos, no quiero que se quede esperando. Quiero que sea petiicion asincrona
         * Ya le agregamos el async al metodo de arriba, aca solo le colocamos await
         * Redirecciono a otra ruta, y esa ruta consultara a la base de datos con los datos guardados
         * No tenedremos que hacer como con los errores y pasarlas a la vista
         */
        await newNote.save();
        req.flash('success_msg', 'Note added Successfully');
        res.redirect("/notes");
    }
});

/**
 *Esta ruta es para devolver todas las notas que un usuario ha creado
 * Note.find(title = '') --> Pasar parametros
 * Una vez los almacene los puedo mostrar en una pagina
 * Cuando visite esta ruta  consulte la bd y le paso la vista con las nota de la bd
 * Al momento de recorrerlo yo puedo acceder a sus propiedades. sort es para mostrarlos en el orden de creaciòn
 */
router.get("/notes", async (req, res) => {
    const notes = await Note.find().sort({ date: "desc" });
    res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id", async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render("notes/edit-note", { note });
});

/**
 * Estoy agregando esos valores ocultos para recibir esos metodos PUT. Como esta recibiendo valores, vamos a obtener el titulo
 * y la descripcion.
 * Busco por ID y luego actualizo el titulo y la descripcion.
 * Es asincronoco
 * Cuando se actualice redirecciono a las notas
 */

router.put("/notes/edit-note/:id", async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note Updated Successfully')
    res.redirect("/notes");
});

/**
 * Para eliminar vamos a tener que usar un formulario
 */
router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully')
    res.redirect('/notes')
});
module.exports = router;
