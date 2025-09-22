import { Router, Request, Response } from 'express';
import { TipoEvaluacionModel } from './TipoEvaluacion.schema';

const router = Router();

// Obtener todos
router.get('/', async (req: Request, res: Response) => {
    try {
        const tipos = await TipoEvaluacionModel.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tipos de evaluación' });
    }
});

// Crear uno nuevo
router.post('/', async (req: Request, res: Response) => {
    try {
        const nuevoTipo = new TipoEvaluacionModel(req.body);
        const guardado = await nuevoTipo.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el tipo de evaluación' });
    }
});

// Actualizar
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const actualizado = await TipoEvaluacionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el tipo de evaluación' });
    }
});

// Eliminar
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await TipoEvaluacionModel.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Tipo de evaluación eliminado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar' });
    }
});

export default router;
