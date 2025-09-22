import { Router, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { PlanillaEvaluacionCabeceraModel } from '../PlanillaEDEvaluacion/EvaluacionCabecera.schema';
import { EvaluacionDetalleModel } from './EvaluacionDetalle.schema';

const router = Router();

router.get('/evaluacion-completa/:idCabecera', async (req: Request, res: Response) => {
    try {
        const { idCabecera } = req.params;
        console.log('➡️ Entró a /evaluacion-completa/:idCabecera', idCabecera);

        // Validar ObjectId
        if (!mongoose.Types.ObjectId.isValid(idCabecera)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        // Buscar cabecera
        const cabecera = await PlanillaEvaluacionCabeceraModel.findById(idCabecera).lean();
        if (!cabecera) {
            return res.status(404).json({ success: false, message: 'Cabecera no encontrada' });
        }

        // Buscar todos los detalles asociados a esa cabecera
        const detalles = await EvaluacionDetalleModel.find({
            idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idCabecera)
        })
            .populate({ path: 'categorias.idCategoria', select: 'descripcionCategoria' })
            .populate({ path: 'categorias.items.idItem', select: 'descripcion' })
            .lean();

        // Retornar todo junto
        return res.status(200).json({
            success: true,
            cabecera,
            detalles
        });

    } catch (error) {
        console.error('❌ Error al obtener evaluación completa:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno al obtener evaluación completa',
            error
        });
    }
});

export default router;
