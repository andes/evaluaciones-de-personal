import { Router, Request, Response } from 'express';
import { PlanillaEDModel } from '../Schemas/PlanillaED';

const router = Router();


router.post('/planillasED', async (req: Request, res: Response) => {
    console.log('Datos recibidos en la solicitud:', req.body);

    const { descripcion, idEfector, idServicio } = req.body;

    if (!descripcion || !idEfector || !idServicio) {
        console.error('Error: Faltan campos obligatorios.');
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    try {
        const newPlanilla = new PlanillaEDModel({
            descripcion,
            idEfector,
            idServicio,
        });

        const savedPlanilla = await newPlanilla.save();
        console.log('Planilla guardada con éxito:', savedPlanilla);

        res.status(201).json(savedPlanilla);
    } catch (error) {
        console.error('Error al guardar la planilla:', error);
        res.status(500).json({ message: 'Error al guardar la planilla.', error });
    }
});






router.get('/planillasED', async (req: Request, res: Response) => {
    try {
        const planillas = await PlanillaEDModel.find();
        res.json(planillas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las planillas.', error });
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    try {
        const planilla = await PlanillaEDModel.findById(req.params.id);
        if (planilla) {
            res.json(planilla);
        } else {
            res.status(404).json({ message: 'Planilla no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la planilla.', error });
    }
});

// Actualizar
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedPlanilla = await PlanillaEDModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedPlanilla) {
            res.json(updatedPlanilla);
        } else {
            res.status(404).json({ message: 'Planilla no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la planilla.', error });
    }
});


router.delete('/planillasED', async (req: Request, res: Response) => {
    try {
        const result = await PlanillaEDModel.deleteMany({});
        res.json({
            message: 'Todas las planillas han sido eliminadas.',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar todas las planillas.', error });
    }
});


export default router;
