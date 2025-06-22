import { Router, Request, Response } from 'express';
import { EvaluacionDetalleModel } from './EvaluacionDetalle.schema';
import { modelo as ItemModel } from '../Items/schemas/items'

import * as mongoose from 'mongoose';

const router = Router();

router.post('/evaluaciondetalle', async (req: Request, res: Response) => {
    try {
        const { _id, idPlanillaEvaluacionCabecera, agenteEvaluado, categorias } = req.body;

        // Validación
        if (!_id || !idPlanillaEvaluacionCabecera || !agenteEvaluado || !agenteEvaluado.idAgenteEvaluado || !agenteEvaluado.nombreAgenteEvaluado || !categorias) {
            return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
        }

        // Convertir IDs a `ObjectId`
        const categoriasTransformadas = categorias.map((categoria: any) => ({
            idCategoria: new mongoose.Types.ObjectId(categoria.idCategoria),
            descripcionCategoria: categoria.descripcionCategoria,
            items: categoria.items.map((item: any) => ({
                idItem: new mongoose.Types.ObjectId(item.idItem),
                descripcion: item.descripcion,
                puntaje: item.puntaje
            }))
        }));

        const nuevaEvaluacion = new EvaluacionDetalleModel({
            _id: new mongoose.Types.ObjectId(_id),
            idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera),
            agenteEvaluado: {
                idAgenteEvaluado: new mongoose.Types.ObjectId(agenteEvaluado.idAgenteEvaluado),
                nombreAgenteEvaluado: agenteEvaluado.nombreAgenteEvaluado
            },
            categorias: categoriasTransformadas
        });

        const evaluacionGuardada = await nuevaEvaluacion.save();

        res.status(201).json({
            success: true,
            data: evaluacionGuardada,
            message: 'Evaluación creada exitosamente'
        });
    } catch (error) {
        console.error('Error al crear evaluación:', error);
        res.status(500).json({ success: false, message: 'Error interno al crear evaluación', error });
    }
});


router.get('/evaluaciondetalle/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        const evaluacion = await EvaluacionDetalleModel.findById(id)
            .populate({ path: 'categorias.idCategoria', select: 'descripcionCategoria' }) // Trae info de Categoría
            .populate({ path: 'categorias.items.idItem', select: 'descripcion' }) // Trae info de Item
            .lean();

        if (!evaluacion) {
            return res.status(404).json({ success: false, message: 'Evaluación no encontrada' });
        }

        res.status(200).json({ success: true, data: evaluacion });
    } catch (error) {
        console.error('Error al obtener evaluación:', error);
        res.status(500).json({ success: false, message: 'Error interno al obtener evaluación', error });
    }
});


router.put('/evaluaciondetalle/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { idPlanillaEvaluacionCabecera, agenteEvaluado, categorias } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido'
            });
        }

        const evaluacionActualizada = await EvaluacionDetalleModel.findByIdAndUpdate(
            id,
            {
                idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera),
                agenteEvaluado: {
                    idAgenteEvaluado: new mongoose.Types.ObjectId(agenteEvaluado.idAgenteEvaluado),
                    nombreAgenteEvaluado: agenteEvaluado.nombreAgenteEvaluado
                },
                categorias
            },
            { new: true }
        );

        if (!evaluacionActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Evaluación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: evaluacionActualizada,
            message: 'Evaluación actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar evaluación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al actualizar evaluación',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

router.delete('/evaluaciondetalle/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido'
            });
        }

        const evaluacionEliminada = await EvaluacionDetalleModel.findByIdAndDelete(id);

        if (!evaluacionEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Evaluación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Evaluación eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar evaluación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al eliminar evaluación',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

router.delete('/evaluaciondetalle', async (req: Request, res: Response) => {
    try {
        const resultado = await EvaluacionDetalleModel.deleteMany({});

        res.status(200).json({
            success: true,
            message: 'Todas las evaluaciones fueron eliminadas',
            deletedCount: resultado.deletedCount
        });
    } catch (error) {
        console.error('Error al eliminar todas las evaluaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al eliminar todas las evaluaciones',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

// correjir id items en la evaluacion
router.put('/evaluaciondetalle/corregir-items/:id', async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'ID de evaluación inválido' });
        }

        const evaluacion = await EvaluacionDetalleModel.findById(id);
        if (!evaluacion) {
            return res.status(404).json({ success: false, message: 'Evaluación no encontrada' });
        }

        // Recorremos las categorías e items para reemplazar los id falsos por los reales
        for (const categoria of evaluacion.categorias) {
            for (const item of categoria.items) {
                const itemReal = await ItemModel.findOne({ descripcion: item.descripcion });
                if (itemReal) {
                    item.idItem = itemReal._id;
                } else {
                    console.warn(`⚠️ No se encontró item con descripción: ${item.descripcion}`);
                }
            }
        }

        await evaluacion.save();

        res.status(200).json({ success: true, message: 'IDs de ítems corregidos exitosamente' });
    } catch (error) {
        console.error('Error al corregir ítems:', error);
        res.status(500).json({ success: false, message: 'Error interno al corregir ítems', error });
    }
});



export default router;
