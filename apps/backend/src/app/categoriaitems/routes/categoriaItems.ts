import { Router } from 'express';
import { CategoriaItemModel as modelo } from '../schemas/categoriaItems';

const router = Router();


router.get('/rmCategoriaItems', async (req, res, next) => {
    try {
        const data = await modelo.find().sort({ descripcion: 1 }); // 1 para orden ascendente
        res.json(data);
    } catch (error) {
        next(error);
    }
});




// Ver si la descripción existe en cualquier categoría
//router.get('/rmCategoriaItems/verificar-descripcion/:descripcion', async (req, res) => {
//   const descripcion = req.params.descripcion;

// Buscar una categoría con la misma descripción
//  const categoria = await modelo.findOne({ descripcion: descripcion });

//if (categoria) {
//  res.json(false); // La descripción ya existe
//} else {
//    res.json(true);  // La descripción es única
//}
//});
//es con console logaion 



//ver este


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




router.put('/rCategoriaItems/:id', async (req, res) => {
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


/*

// Ruta PATCH para actualizar parcialmente un documento
router.patch('/rCategoriaItems/:id', async (req, res) => {
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
*/
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
export default router;

