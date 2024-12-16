import { Router } from 'express';
import { modelo } from '../schemas/items';
// import { application } from '../../application';

const router = Router();


router.get('/rmItems', async (req, res, next) => {
    try {
        const data = await modelo.find().sort({ descripcion: 1 }); // 1 para orden ascendente

        res.json(data);
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});


router.get('/rmItems/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await modelo.findById(id);
    res.json(respuesta);
});



// Ver si la descripción existe
router.get('/rItems/verificar-descripcion/:descripcion', async (req, res) => {
    const descripcion = req.params.descripcion;
    const { id } = req.query;
    // Buscar una items con la misma descripción pero excluir la ite actual
    const categoria = await modelo.findOne({ descripcion: descripcion, _id: { $ne: id } });

    if (categoria) {
        res.json(false); // La descripción ya existe (no es única)
    } else {
        res.json(true);  // La descripción es única (puede usarse)
    }
});


//alta


router.post('/rmItems', async (req, res) => {
    try {
        console.log('Solicitud POST recibida en /rmItems:', req.body); // Log de la solicitud recibida
        const newItems = await modelo.create(req.body);
        res.json(newItems);
    } catch (error) {
        console.error('Error al crear el ítem:', error); // Log del error
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});


//modificar

router.put('/rItems/:id', async (req, res) => {
    try {
        const nuevaDescripcion = req.body.descripcion;  // Obtener la nueva descripción

        // Verificar si ya existe cualquier categoría con la misma descripción
        const categoriaExistente = await modelo.findOne({ descripcion: nuevaDescripcion });

        // Si se encuentra una categoría con la misma descripción, devolver un error
        if (categoriaExistente) {
            return res.status(400).json({
                error: 'La descripción ya se encuentra registrada en otro documento.'
            });
        }

        // Proceder a la actualización ya que no se encontró ninguna categoría con esa descripción
        const respuesta = await modelo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Si no se encuentra la categoría con el ID proporcionado
        if (!respuesta) {
            return res.status(404).json({ error: 'No se encontró la categoría para actualizar.' });
        }


        // Mostrar la respuesta en la consola
        console.log('Categoría actualizada:', respuesta);

        // Responder con la categoría actualizada
        res.json(respuesta);

    } catch (error) {
        // Manejo de errores generales
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});





// Ruta PATCH para actualizar parcialmente un documento
router.patch('/rItems/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const actualizacion = req.body;
        const opciones = { new: true }; // Para devolver el documento actualizado
        //const respuesta = await modelo.findByIdAndUpdate(id, actualizacion, opciones);
        const respuesta = await modelo.findByIdAndUpdate(_id, actualizacion, opciones);
        if (respuesta) {
            res.json(respuesta);
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

router.delete('/rItems/:id', async (req, res) => {
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

// thunder   http://localhost:3000/api/rItems/



//put modificaar
//router.post('/items', (req, res) => {
//    const newItem = req.body; // El nuevo item se espera en el cuerpo de la solicitud
//    items.push(newItem);
//    res.status(201).json(newItem); // Responder con el item creado y un código de estado 201
//});


export default router;

