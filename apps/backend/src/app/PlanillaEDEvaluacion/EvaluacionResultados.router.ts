import { Router, Request, Response } from 'express';
import { EvaluacionDetalleModel } from './EvaluacionDetalle.schema';
import * as mongoose from 'mongoose';

const router = Router();

// ✅ Filtrar por cabecera y agente
function validarIds(idCabecera: string, idAgente: string, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(idCabecera) || !mongoose.Types.ObjectId.isValid(idAgente)) {
        res.status(400).json({ success: false, message: 'ID inválido' });
        return false;
    }
    return true;
}

// Cantidad de items por idCabecera e idAgente
router.get('/evaluacionItems/contar-items/:idPlanillaEvaluacionCabecera/:idAgente', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera, idAgente } = req.params;

        if (!validarIds(idPlanillaEvaluacionCabecera, idAgente, res)) return;

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera),
                    "agenteEvaluado.idAgenteEvaluado": new mongoose.Types.ObjectId(idAgente)
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

// Cantidad de items con valor > 0
router.get('/evaluacionItems/contar-items-valor/:idPlanillaEvaluacionCabecera/:idAgente', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera, idAgente } = req.params;

        if (!validarIds(idPlanillaEvaluacionCabecera, idAgente, res)) return;

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera),
                    "agenteEvaluado.idAgenteEvaluado": new mongoose.Types.ObjectId(idAgente)
                }
            },
            { $unwind: "$categorias" },
            { $unwind: "$categorias.items" },
            { $match: { "categorias.items.puntaje": { $gt: 0 } } },
            { $count: "totalItemsConValor" }
        ]);

        const totalItems = resultado.length > 0 ? resultado[0].totalItemsConValor : 0;
        return res.status(200).json({ success: true, totalItems });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno', error });
    }
});

// Suma y promedio de puntajes
router.get('/evaluacionItems/sumaPromediaPuntajes/:idPlanillaEvaluacionCabecera/:idAgente', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera, idAgente } = req.params;

        if (!validarIds(idPlanillaEvaluacionCabecera, idAgente, res)) return;

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera),
                    "agenteEvaluado.idAgenteEvaluado": new mongoose.Types.ObjectId(idAgente)
                }
            },
            { $unwind: "$categorias" },
            { $unwind: "$categorias.items" },
            { $match: { "categorias.items.puntaje": { $gt: 0 } } },
            { $group: { _id: null, sumaPuntajes: { $sum: "$categorias.items.puntaje" }, cantidad: { $sum: 1 } } },
            { $project: { _id: 0, sumaPuntajes: 1, cantidad: 1, promedio: { $divide: ["$sumaPuntajes", "$cantidad"] } } }
        ]);

        if (resultado.length === 0) {
            return res.status(200).json({ success: true, sumaPuntajes: 0, cantidad: 0, promedio: 0 });
        }

        return res.status(200).json({
            success: true,
            sumaPuntajes: resultado[0].sumaPuntajes,
            cantidad: resultado[0].cantidad,
            promedio: resultado[0].promedio
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno', error });
    }
});

// Totales simples (items y suma de puntajes)
router.get('/evaluacionItems/totales/:idPlanillaEvaluacionCabecera/:idAgente', async (req: Request, res: Response) => {
    try {
        const { idPlanillaEvaluacionCabecera, idAgente } = req.params;

        if (!validarIds(idPlanillaEvaluacionCabecera, idAgente, res)) return;

        const resultado = await EvaluacionDetalleModel.aggregate([
            {
                $match: {
                    idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idPlanillaEvaluacionCabecera),
                    "agenteEvaluado.idAgenteEvaluado": new mongoose.Types.ObjectId(idAgente)
                }
            },
            { $unwind: "$categorias" },
            { $unwind: "$categorias.items" },
            { $group: { _id: null, totalItems: { $sum: 1 }, totalPuntaje: { $sum: "$categorias.items.puntaje" } } },
            { $project: { _id: 0, totalItems: 1, totalPuntaje: 1 } }
        ]);

        const totales = resultado.length > 0 ? resultado[0] : { totalItems: 0, totalPuntaje: 0 };
        return res.status(200).json({ success: true, ...totales });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno', error });
    }
});

export const evaluacionResultadosRouter = router;
