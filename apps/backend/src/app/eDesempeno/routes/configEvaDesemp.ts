import { Router } from 'express';
import { modelo } from '../schemas/configEvaDesemp';


const router = Router();

router.get('/rEvaDesemp', async (req, res, next) => {

    const data = await modelo.find();
    res.json(data);
    res.send("hola")
});

router.get('/rEvaDesemp/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await modelo.findById(id);
    res.json(respuesta);
});

router.post('/rEvaDesemp', async (req, res) => {
    try {
        const newItems = await modelo.create(req.body);
        res.json(newItems);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
})

router.delete('/rEvaDesemp', async (req, res) => {
    try {
        const resultado = await modelo.deleteMany({});
        res.json({ message: `Se eliminaron ${resultado.deletedCount} registros.` });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar todos los registros.' });
    }
});




//post arrays
router.post('/rEvaDesemp', async (req, res) => {
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

router.put('/rEvaDesemp/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await modelo.findByIdAndUpdate(id, req.body);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});

// Ruta PATCH para actualizar parcialmente un documento


//pach 2

router.delete('/rEvaDesemp/:id', async (req, res) => {
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

export default router;

