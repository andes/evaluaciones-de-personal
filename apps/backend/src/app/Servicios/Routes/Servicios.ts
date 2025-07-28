import { Router } from 'express';
import { ServicioModel } from '../Schemas/servicios';

const router = Router();

router.get('/rmServicios', async (req, res, next) => {
    try {
        const data = await ServicioModel.find().sort({ descripcion: 1 });

        res.json(data);
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});


router.get('/rmServicios/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ServicioModel.findById(id);
    console.log('Respuesta del servidor:', id);
    res.json(respuesta);
});



//alta


router.post('/rmServicios', async (req, res) => {
    try {
        console.log('Solicitud POST recibida en /rmItems:', req.body);
        const newItems = await ServicioModel.create(req.body);
        res.json(newItems);
    } catch (error) {
        console.error('Error al crear el ítem:', error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});


//modificar

router.put('/rmServicios/:id', async (req, res) => {
    try {
        const nuevaDescripcion = req.body.descripcion;

        const categoriaExistente = await ServicioModel.findOne({ descripcion: nuevaDescripcion });


        if (categoriaExistente) {
            return res.status(400).json({
                error: 'La descripción ya se encuentra registrada en otro documento.'
            });
        }


        const respuesta = await ServicioModel.findByIdAndUpdate(req.params.id, req.body, { new: true });


        if (!respuesta) {
            return res.status(404).json({ error: 'No se encontró la categoría para actualizar.' });
        }




        res.json(respuesta);

    } catch (error) {

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


export default router;

