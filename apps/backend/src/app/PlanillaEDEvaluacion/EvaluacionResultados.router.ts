import { Router, Request, Response } from 'express';
import { EvaluacionDetalleModel } from './EvaluacionDetalle.schema';
import * as mongoose from 'mongoose';

const router = Router();

//cantidad de items por id evaluacion
router.get('/evaluacionItems/contar-items/:idPlanillaEvaluacionCabecera', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera } = req.params;

        if (!mongoose.Types.ObjectId.isValid(idPlanillaEvaluacionCabecera)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera)
                }
            },
            { $unwind: "$categorias" },
            { $unwind: "$categorias.items" },
            { $count: "totalItems" }
        ]);

        const totalItems = resultado.length > 0 ? resultado[0].totalItems : 0;

        return res.status(200).json({ success: true, totalItems });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno', error });
    }
});

// cantidad de items con valor > a 0

router.get('/evaluacionItems/contar-items-valor/:idPlanillaEvaluacionCabecera', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera } = req.params;

        if (!mongoose.Types.ObjectId.isValid(idPlanillaEvaluacionCabecera)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera)
                }
            },
            { $unwind: "$categorias" },
            { $unwind: "$categorias.items" },
            {
                $match: {
                    "categorias.items.puntaje": { $gt: 0 } // CORREGIDO: usar puntaje, no valor
                }
            },
            { $count: "totalItemsConValor" }
        ]);

        const totalItems = resultado.length > 0 ? resultado[0].totalItemsConValor : 0;

        return res.status(200).json({ success: true, totalItems });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno', error });
    }
});

router.get('/evaluacionItems/sumaPromediaPuntajes/:idPlanillaEvaluacionCabecera', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera } = req.params;

        if (!mongoose.Types.ObjectId.isValid(idPlanillaEvaluacionCabecera)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera)
                }
            },
            { $unwind: "$categorias" },
            { $unwind: "$categorias.items" },
            {
                $match: {
                    "categorias.items.puntaje": { $gt: 0 }
                }
            },
            {
                $group: {
                    _id: null,
                    sumaPuntajes: { $sum: "$categorias.items.puntaje" },
                    cantidad: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    sumaPuntajes: 1,
                    cantidad: 1,
                    promedio: { $divide: ["$sumaPuntajes", "$cantidad"] }
                }
            }
        ]);

        if (resultado.length === 0) {
            return res.status(200).json({
                success: true,
                sumaPuntajes: 0,
                cantidad: 0,
                promedio: 0
            });
        }

        return res.status(200).json({
            success: true,
            sumaPuntajes: resultado[0].sumaPuntajes,
            cantidad: resultado[0].cantidad,
            promedio: resultado[0].promedio
        });
    } catch (error) {
        console.error('❌ Error interno:', error);
        return res.status(500).json({ success: false, message: 'Error interno', error });
    }
});


export const evaluacionResultadosRouter = router;