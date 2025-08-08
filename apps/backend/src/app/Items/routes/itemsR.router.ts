import { Router, Request, Response } from 'express';
import { ItemModel } from '../schemas/items';
const router = Router();


router.post('/itemsR', async (req: Request, res: Response) => {
    try {
        const nuevoItem = new ItemModel(req.body);
        const resultado = await nuevoItem.save();
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el ítem', error });
    }
});


router.get('/itemsR', async (_req: Request, res: Response) => {
    try {
        const items = await ItemModel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los ítems', error });
    }
});


router.get('/itemsR/:id', async (req: Request, res: Response) => {
    try {
        const item = await ItemModel.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ mensaje: 'Ítem no encontrado' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al buscar el ítem', error });
    }
});


router.put('/itemsR/:id', async (req: Request, res: Response) => {
    try {
        const actualizado = await ItemModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Ítem no encontrado' });
        }
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el ítem', error });
    }
});


router.delete('/itemsR/:id', async (req: Request, res: Response) => {
    try {
        const eliminado = await ItemModel.findByIdAndDelete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Ítem no encontrado' });
        }
        res.status(200).json({ mensaje: 'Ítem eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el ítem', error });
    }
});

export default router;
