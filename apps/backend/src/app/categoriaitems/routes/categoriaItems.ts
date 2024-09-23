import { Router } from 'express';
import { modelo } from '../schemas/categoriaItems';
// import { application } from '../../application';

const router = Router();

router.get('/rCategoriaItems', (req, res) => {
    // lógica para manejar la solicitud
    res.send('Items de categoría');
});

router.get('/rmCategoriaItems', async (req, res, next) => {

    const data = await modelo.find();
    res.json(data);
    res.send("hola")
});

router.get('/rCategoriaItems/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await modelo.findById(id);
    res.json(respuesta);
});

router.post('/rCategoriaItems', async (req, res) => {
    try {
        const newItems = await modelo.create(req.body);
        res.json(newItems);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
})



//post arrays
router.post('/rCategoriaItems', async (req, res) => {
    try {
        // Verificar si     req.body es un array
        if (Array.isArray(req.body)) {
            const newItems = await modelo.insertMany(req.body);
            res.json(newItems);
        } else {
            const newItem = await modelo.create(req.body);
            res.json(newItem);
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});
// post arrays

router.put('/rCategoriaItems/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await modelo.findByIdAndUpdate(id, req.body);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

// Ruta PATCH para actualizar parcialmente un documento
router.patch('/rCategoriaItems/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const actualizacion = req.body;
        const opciones = { new: true }; // Para devolver el documento actualizado
        //const respuesta = await modelo.findByIdAndUpdate(id, actualizacion, opciones);
        const respuesta = await modelo.findByIdAndUpdate(id, actualizacion, opciones);
        if (respuesta) {
            res.json(respuesta);
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

router.delete('/rCategoriaItems/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await modelo.findByIdAndDelete(id);
        if (respuesta) {
            res.json({ message: 'Documento eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

// thunder   http://localhost:3000/api/rCategoriaItems/



//put modificaar
//router.post('/items', (req, res) => {
//    const newItem = req.body; // El nuevo item se espera en el cuerpo de la solicitud
//    items.push(newItem);
//    res.status(201).json(newItem); // Responder con el item creado y un código de estado 201
//});


export default router;

