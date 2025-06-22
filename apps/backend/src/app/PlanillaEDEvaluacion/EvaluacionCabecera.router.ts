import { Router, Request, Response } from 'express';
import { PlanillaEvaluacionCabeceraModel } from '../PlanillaEDEvaluacion/EvaluacionCabecera.schema';
import * as mongoose from 'mongoose';

import { ServicioModel } from '../Servicios/Schemas/servicios';
import { EfectorModel } from '../Efectores/schemas/efectores';



const router = Router();

router.post('/planillaedcabecera', async (req: Request, res: Response) => {
    try {
        const {
            periodo,
            agenteevaluador,
            Efector,
            Servicio,
            usuario
        }: {
            periodo: string;
            agenteevaluador: { idUsuarioEvaluador: string; nombreUsuarioEvaluador: string };

            Efector: { idEfector: string };
            Servicio: { idServicio: string };
            usuario: string;
        } = req.body;

        // Validación de campos requeridos
        if (!periodo || !agenteevaluador || !Efector || !Servicio || !usuario) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        // Validar y buscar Efector
        const efectorDB = await EfectorModel.findById(Efector.idEfector);
        const efectorConNombre = {
            idEfector: Efector.idEfector,
            nombre: efectorDB && 'nombre' in efectorDB ? efectorDB.nombre : 'Nombre no encontrado'
        };

        // Validar y buscar Servicio
        const servicioDB = await ServicioModel.findById(Servicio.idServicio);
        const servicioConNombre = {
            idServicio: Servicio.idServicio,
            nombre: servicioDB && 'nombre' in servicioDB ? servicioDB.nombre : 'Nombre no encontrado'
        };

        // Preparar objeto final
        const nuevaCabecera = new PlanillaEvaluacionCabeceraModel({
            periodo: new Date(periodo),
            agenteevaluador: {
                idUsuarioEvaluador: new mongoose.Types.ObjectId(agenteevaluador.idUsuarioEvaluador),
                nombreUsuarioEvaluador: agenteevaluador.nombreUsuarioEvaluador
            },

            Efector: efectorConNombre,
            Servicio: servicioConNombre,
            usuario,
            fechaMod: new Date()
        });

        const cabeceraGuardada = await nuevaCabecera.save();
        res.status(201).json({
            success: true,
            data: cabeceraGuardada.toObject(),
            message: 'Cabecera de evaluación creada exitosamente'
        });

    } catch (error) {
        console.error('Error al crear cabecera de evaluación:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear cabecera de evaluación',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});




// GET - Obtener todas las cabeceras
router.get('/', async (_req: Request, res: Response) => {
    try {
        const cabeceras = await PlanillaEvaluacionCabeceraModel.find();
        res.status(200).json({
            success: true,
            data: cabeceras
        });
    } catch (error) {
        console.error('Error al obtener cabeceras:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener cabeceras',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

// GET por ID - Obtener una cabecera específica
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido'
            });
        }

        const cabecera = await PlanillaEvaluacionCabeceraModel.findById(id);

        if (!cabecera) {
            return res.status(404).json({
                success: false,
                message: 'Cabecera no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: cabecera
        });
    } catch (error) {
        console.error('Error al obtener cabecera por ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener cabecera por ID',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

// DELETE por ID - Eliminar una cabecera

router.delete('/evaluacioncabecera/:id', async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido'
            });
        }

        const cabeceraEliminada = await PlanillaEvaluacionCabeceraModel.findByIdAndDelete(id);

        if (!cabeceraEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Cabecera no encontrada para eliminar'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cabecera eliminada correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar cabecera:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar cabecera',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

router.delete('/evaluacioncabecera', async (req: Request, res: Response) => {
    try {
        const resultado = await PlanillaEvaluacionCabeceraModel.deleteMany({});

        res.status(200).json({
            success: true,
            message: 'Todas las cabeceras fueron eliminadas',
            deletedCount: resultado.deletedCount
        });
    } catch (error) {
        console.error('Error al eliminar todas las cabeceras:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar todas las cabeceras',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});


export default router;
