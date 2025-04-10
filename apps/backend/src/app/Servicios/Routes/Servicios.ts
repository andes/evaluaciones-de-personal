import { Router } from 'express';
import { ServicioModel } from '../Schemas/servicios';
import { ServicioSchema } from '../Schemas/servicios';


const router = Router();


router.get('/rmServicios', async (req, res, next) => {
    try {
        const data = await ServicioModel.find().sort({ descripcion: 1 }); // 1 para orden ascendente

        res.json(data);
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});


router.get('/rmServicios/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ServicioModel.findById(id);
    res.json(respuesta);
});



//alta


router.post('/rmServicios', async (req, res) => {
    try {
        console.log('Solicitud POST recibida en /rmItems:', req.body); // Log de la solicitud recibida
        const newItems = await ServicioModel.create(req.body);
        res.json(newItems);
    } catch (error) {
        console.error('Error al crear el ítem:', error); // Log del error
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});


//modificar

router.put('/rmServicios/:id', async (req, res) => {
    try {
        const nuevaDescripcion = req.body.descripcion;  // Obtener la nueva descripción

        // Verificar si ya existe cualquier categoría con la misma descripción
        const categoriaExistente = await ServicioModel.findOne({ descripcion: nuevaDescripcion });

        // Si se encuentra una categoría con la misma descripción, devolver un error
        if (categoriaExistente) {
            return res.status(400).json({
                error: 'La descripción ya se encuentra registrada en otro documento.'
            });
        }

        // Proceder a la actualización ya que no se encontró ninguna categoría con esa descripción
        const respuesta = await ServicioModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

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





router.delete('/rsServicios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ServicioModel.findByIdAndDelete(id);
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




export default router;

