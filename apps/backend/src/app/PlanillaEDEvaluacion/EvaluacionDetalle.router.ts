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
                nombreAgenteEvaluado: agenteEvaluado.nombreAgenteEvaluado,
                legajo: agenteEvaluado.legajo
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
                    nombreAgenteEvaluado: agenteEvaluado.nombreAgenteEvaluado,
                    legajo: agenteEvaluado.legajo // 
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

// Verificar si ya existe evaluación idevaluacion e idagenteevaluado
router.get('/evaluaciondetalle/existe/:idCabecera/:idAgente', async (req: Request, res: Response) => {
    try {
        const { idCabecera, idAgente } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(idCabecera) ||
            !mongoose.Types.ObjectId.isValid(idAgente)
        ) {
            return res.status(400).json({ success: false, message: 'IDs inválidos' });
        }

        const existe = await EvaluacionDetalleModel.exists({
            idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idCabecera),
            'agenteEvaluado.idAgenteEvaluado': new mongoose.Types.ObjectId(idAgente)
        });

        if (existe) {
            return res.status(200).json({ success: true, existe: true });
        } else {
            return res.status(200).json({ success: true, existe: false });
        }

    } catch (error) {
        console.error('Error al verificar existencia:', error);
        res.status(500).json({ success: false, message: 'Error interno al verificar existencia' });
    }
});


// GET todas las evaluaciones (agentes) para una cabecera específica
router.get(
    '/evaluaciondetalle/por-cabecera/:idCabecera',
    async (req: Request, res: Response) => {
        try {
            const { idCabecera } = req.params;

            // 1) Validar ObjectId
            if (!mongoose.Types.ObjectId.isValid(idCabecera)) {
                return res
                    .status(400)
                    .json({ success: false, message: 'ID de cabecera inválido' });
            }

            // 2) Buscar evaluaciones ligadas a esa cabecera
            const evaluaciones = await EvaluacionDetalleModel.find({
                idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idCabecera)
            })
                .populate({ path: 'categorias.idCategoria', select: 'descripcionCategoria' })
                .populate({ path: 'categorias.items.idItem', select: 'descripcion' })
                .lean();

            // 3) Responder
            return res.status(200).json({ success: true, data: evaluaciones });
        } catch (error) {
            console.error('Error al obtener evaluaciones por cabecera:', error);
            return res
                .status(500)
                .json({ success: false, message: 'Error interno', error: (error as Error).message });
        }
    }
);

// GET todas las evaluaciones (agentes) para una cabecera específica
router.get(
    '/evaluaciondetalle/por-cabecera/:idCabecera/agentes',
    async (req: Request, res: Response) => {
        try {
            const { idCabecera } = req.params;
            if (!mongoose.Types.ObjectId.isValid(idCabecera)) {
                return res
                    .status(400)
                    .json({ success: false, message: 'ID de cabecera inválido' });
            }

            // Encuentra sólo agenteEvaluado.* y excluye _id
            const agentes = await EvaluacionDetalleModel.find(
                { idPlanillaEvaluacionCabecera: idCabecera },
                {
                    'agenteEvaluado.idAgenteEvaluado': 1,
                    'agenteEvaluado.nombreAgenteEvaluado': 1,
                    'agenteEvaluado.legajo': 1, // <-- agregar
                    _id: 0
                }
            ).lean();

            // agentes tendrá esta forma:
            // [ { agenteEvaluado: { idAgenteEvaluado: ..., nombreAgenteEvaluado: ... } }, … ]

            // Opcional: desenrollar el objeto
            const lista = agentes.map(a => a.agenteEvaluado);

            return res.status(200).json({ success: true, data: lista });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: 'Error interno', error: (error as Error).message });
        }
    }
);

// GET categorías e ítems según ID de evaluación. componente EvaluacionItemsComponent

router.get('/evaluaciondetalle/categorias-items/:idEvaluacion/:idAgente', async (req: Request, res: Response) => {
    try {
        const { idEvaluacion, idAgente } = req.params;

        // Validar ambos IDs
        if (
            !mongoose.Types.ObjectId.isValid(idEvaluacion) ||
            !mongoose.Types.ObjectId.isValid(idAgente)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Uno o ambos IDs son inválidos'
            });
        }

        // Buscar la evaluación por idEvaluacion + idAgenteEvaluado
        const evaluacion = await EvaluacionDetalleModel.findOne({
            idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idEvaluacion),
            'agenteEvaluado.idAgenteEvaluado': new mongoose.Types.ObjectId(idAgente)
        })
            .populate({ path: 'categorias.idCategoria', select: 'descripcionCategoria' })
            .populate({ path: 'categorias.items.idItem', select: 'descripcion' })
            .lean();

        if (!evaluacion) {
            return res.status(404).json({
                success: false,
                message: 'Evaluación no encontrada para este agente'
            });
        }

        return res.status(200).json({
            success: true,
            data: evaluacion.categorias
        });

    } catch (error) {
        console.error('❌ Error al obtener categorías e ítems:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno al obtener categorías e ítems',
            error: (error as Error).message
        });
    }
});
// busqca evaluacion id evaluacion, id agente, id item punto caramelo para evaluar modal evaluacionitems.ts
router.get('/evaluaciondetalle/item-interno/:idEvaluacion/:idAgente/:idItemInterno', async (req: Request, res: Response) => {
    try {
        const { idEvaluacion, idAgente, idItemInterno } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(idEvaluacion) ||
            !mongoose.Types.ObjectId.isValid(idAgente) ||
            !mongoose.Types.ObjectId.isValid(idItemInterno)
        ) {
            return res.status(400).json({ success: false, message: 'Uno o más IDs son inválidos' });
        }

        const evaluacion = await EvaluacionDetalleModel.findOne({
            idPlanillaEvaluacionCabecera: new mongoose.Types.ObjectId(idEvaluacion),
            'agenteEvaluado.idAgenteEvaluado': new mongoose.Types.ObjectId(idAgente)
        })
            .populate({ path: 'categorias.idCategoria', select: 'descripcionCategoria' })
            .populate({ path: 'categorias.items.idItem', select: 'descripcion' })
            .lean();

        if (!evaluacion) {
            return res.status(404).json({ success: false, message: 'Evaluación no encontrada' });
        }

        for (const cat of evaluacion.categorias) {
            for (const item of cat.items) {
                if (item._id.toString() === idItemInterno) {
                    return res.status(200).json({
                        success: true,
                        data: {
                            categoria: {
                                _id: cat.idCategoria._id,
                                descripcionCategoria: cat.idCategoria.descripcionCategoria
                            },
                            item: item
                        }
                    });
                }
            }
        }

        return res.status(404).json({
            success: false,
            message: 'Ítem embebido no encontrado en esta evaluación'
        });

    } catch (error) {
        console.error('❌ Error al buscar ítem interno:', error);
        res.status(500).json({ success: false, message: 'Error interno', error });
    }
});



export default router;