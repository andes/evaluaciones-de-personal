import { Router, Request, Response } from 'express';
import { PlanillaEvaluacionCabeceraModel } from '../PlanillaEDEvaluacion/EvaluacionCabecera.schema';
import * as mongoose from 'mongoose';

import { ServicioModel } from '../Servicios/Schemas/servicios';
import { EfectorModel } from '../Efectores/schemas/efectores';
import { TipoCierreEvaluacionModel } from '../TipoCierreEvaluacion/TipoCierreEvaluacion.schema';

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

        if (!periodo || !agenteevaluador || !Efector || !Servicio || !usuario) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        const efectorDB = await EfectorModel.findById(Efector.idEfector);
        const efectorConNombre = {
            idEfector: Efector.idEfector,
            nombre: efectorDB && 'nombre' in efectorDB ? efectorDB.nombre : 'Nombre no encontrado'
        };

        const servicioDB = await ServicioModel.findById(Servicio.idServicio);
        const servicioConNombre = {
            idServicio: Servicio.idServicio,
            nombre: servicioDB && 'nombre' in servicioDB ? servicioDB.nombre : 'Nombre no encontrado'
        };

        const nuevaCabecera = new PlanillaEvaluacionCabeceraModel({
            periodo: new Date(periodo),
            agenteevaluador: {
                idUsuarioEvaluador: new mongoose.Types.ObjectId(agenteevaluador.idUsuarioEvaluador),
                nombreUsuarioEvaluador: agenteevaluador.nombreUsuarioEvaluador
            },
            Efector: efectorConNombre,
            Servicio: servicioConNombre,
            usuario,
            fechaMod: new Date(),

            // 👇 Aquí agregamos el valor fijo
            tipoCierreEvaluacion: {
                id: new mongoose.Types.ObjectId("688240f09cca123543c84b04"),
                nombre: "Evaluación Abierta"
            }
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




router.post('/planillaedcabecera/existe', async (req: Request, res: Response) => {
    try {
        const {
            periodo,
            agenteevaluador,
            Efector,
            Servicio
        }: {
            periodo: string;
            agenteevaluador: { idUsuarioEvaluador: string };
            Efector: { idEfector: string };
            Servicio: { idServicio: string };
        } = req.body;

        if (!periodo || !agenteevaluador || !Efector || !Servicio) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos para la consulta'
            });
        }

        const fechaPeriodo = new Date(periodo);

        const existeCabecera = await PlanillaEvaluacionCabeceraModel.findOne({
            periodo: fechaPeriodo,
            'agenteevaluador.idUsuarioEvaluador': new mongoose.Types.ObjectId(agenteevaluador.idUsuarioEvaluador),
            'Efector.idEfector': Efector.idEfector,
            'Servicio.idServicio': Servicio.idServicio
        });

        if (existeCabecera) {
            return res.status(200).json({
                success: true,
                existe: true,
                data: existeCabecera
            });
        } else {
            return res.status(200).json({
                success: true,
                existe: false
            });
        }

    } catch (error) {
        console.error('Error al verificar existencia de cabecera:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al verificar cabecera',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

router.get('/planillaedcabecera/buscar', async (req: Request, res: Response) => {
    try {
        const { idUsuarioEvaluador, idEfector, idServicio } = req.query;

        if (!idUsuarioEvaluador || !idEfector || !idServicio) {
            return res.status(400).json({
                success: false,
                message: 'Faltan parámetros: idUsuarioEvaluador, idEfector o idServicio'
            });
        }

        const cabeceras = await PlanillaEvaluacionCabeceraModel.find({
            'agenteevaluador.idUsuarioEvaluador': new mongoose.Types.ObjectId(idUsuarioEvaluador as string),
            'Efector.idEfector': idEfector,
            'Servicio.idServicio': idServicio
        }).sort({ periodo: 1 });

        res.status(200).json({
            success: true,
            total: cabeceras.length,
            data: cabeceras
        });
    } catch (error) {
        console.error('Error al buscar cabeceras filtradas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al buscar cabeceras',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

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


router.get('/evaluacioncabecera/:id', async (req: Request, res: Response) => {
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

export default router;
