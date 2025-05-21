import { Router } from 'express';
import { PlanillaEDEvaluacionModel } from './PlanillaEDEvaluacion.schema';
import * as mongoose from 'mongoose';
import { PlanillaEDModel } from '../PlanillaED/Schemas/PlanillaED';
import PlanillaModel from '../PlanillaED/Router/PlanillaED';

const router = Router();

// PUT: Crear cabecera de evaluación sin agentes
router.put('/rmCabeceraEvaluacion', async (req, res) => {
    try {
        const {
            idPlanillaED,
            periodo,
            idAgenteEvaluador,
            nombreAgenteEvaluador,
            idEfector,
            efector,
            idServicio,
            servicio,
            usuario
        } = req.body;

        console.log('Periodo recibido:', periodo);

        // Convertir periodo a Date y truncar a 00:00:00 por si viene con hora
        const periodoDate = new Date(periodo);
        periodoDate.setHours(0, 0, 0, 0);

        // Validación: evitar duplicados por periodo + efector + servicio
        const existente = await PlanillaEDEvaluacionModel.findOne({
            periodo: periodoDate,
            idEfector: new mongoose.Types.ObjectId(idEfector) as any,
            idServicio: new mongoose.Types.ObjectId(idServicio) as any
        });

        if (existente) {
            return res.status(400).json({
                mensaje: 'Ya existe una evaluación para este periodo, efector y servicio.'
            });
        }

        // Crear el documento sin agentes
        const nuevaCabecera = new PlanillaEDEvaluacionModel({
            idPlanillaED: new mongoose.Types.ObjectId(idPlanillaED),
            periodo: periodoDate,
            idAgenteEvaluador: new mongoose.Types.ObjectId(idAgenteEvaluador),
            nombreAgenteEvaluador,
            idEfector: new mongoose.Types.ObjectId(idEfector),
            efector,
            idServicio: new mongoose.Types.ObjectId(idServicio),
            servicio,
            usuario
        });

        const resultado = await nuevaCabecera.save();
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la cabecera:', error);
        res.status(500).json({ mensaje: 'Error interno al guardar la cabecera', error });
    }
});

// GET: Obtener todas las cabeceras de evaluación

router.get('/rmCabeceraEvaluacion', async (req, res) => {
    try {
        const cabeceras = await PlanillaEDEvaluacionModel.find().sort({ periodo: -1 });
        res.json(cabeceras);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al obtener cabeceras', err });
    }
});

// DELETE: Eliminar cabecera de evaluación por su _id
router.delete('/rmCabeceraEvaluacion/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que sea un ObjectId válido
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ mensaje: 'ID inválido.' });
        }

        const eliminado = await PlanillaEDEvaluacionModel.findByIdAndDelete(id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'No se encontró la cabecera con ese ID.' });
        }

        // Opcional: devolver el documento eliminado
        res.status(200).json({
            mensaje: 'Cabecera eliminada correctamente.',
            cabecera: eliminado
        });
    } catch (error) {
        console.error('Error al eliminar la cabecera:', error);
        res.status(500).json({ mensaje: 'Error interno al eliminar la cabecera', error });
    }
});


router.post('/:idPlanillaED/agente', async (req, res) => {
    try {
        const { idPlanillaED } = req.params;
        const { idAgente, nombreAgente } = req.body;

        if (!mongoose.isValidObjectId(idPlanillaED) || !mongoose.isValidObjectId(idAgente)) {
            return res.status(400).json({ mensaje: 'ID inválido.' });
        }

        const actualizado = await PlanillaEDEvaluacionModel.findOneAndUpdate(
            { _id: idPlanillaED },
            {
                $push: {
                    agentes: {
                        idAgente,
                        nombreAgente,
                        categorias: []
                    }
                }
            },
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'No se encontró la planilla.' });
        }

        return res.status(200).json(actualizado);
    } catch (error) {
        console.error('Error al añadir agente:', error);
        return res.status(500).json({ mensaje: 'Error interno al añadir agente', error });
    }
});



export default router;
