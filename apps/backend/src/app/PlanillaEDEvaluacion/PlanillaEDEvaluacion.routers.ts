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

//agrega items y categoria segun id planilla
/*
router.post('/:idEvaluacionED/agente/:idAgente/categorias-desde-plantilla', async (req, res) => {
    console.log('➡️ Entró a la ruta POST /:idEvaluacionED/agente/:idAgente/categorias-desde-plantilla');

    try {
        const { idEvaluacionED, idAgente } = req.params;
        console.log('📌 Params:', { idEvaluacionED, idAgente });

        if (!mongoose.isValidObjectId(idEvaluacionED) || !mongoose.isValidObjectId(idAgente)) {
            console.log('❌ ID inválido');
            return res.status(400).json({ mensaje: 'ID inválido.' });
        }

        const evaluacion = await PlanillaEDEvaluacionModel.findById(idEvaluacionED);
        if (!evaluacion) {
            console.log('❌ Evaluación no encontrada');
            return res.status(404).json({ mensaje: 'Evaluación no encontrada.' });
        }

        console.log('✅ Evaluación encontrada:', evaluacion._id);

        const plantilla = await PlanillaEDModel.findById(evaluacion.idPlanillaED);
        if (!plantilla) {
            console.log('❌ Plantilla base no encontrada');
            return res.status(404).json({ mensaje: 'Plantilla base no encontrada.' });
        }

        console.log('✅ Plantilla encontrada:', plantilla._id);

        const categoriasDesdePlantilla = plantilla.categorias.map(function (cat) {
            return {
                idCategoria: cat.categoria._id,  // ✅ CORREGIDO: usamos solo el _id
                descripcion: cat.descripcion,
                items: cat.items.map(function (item) {
                    return {
                        idItems: item._id.toString(),
                        descripcion: item.descripcion,
                        valor: 0
                    };
                })
            };
        });


        console.log('📦 Categorías generadas desde plantilla:', categoriasDesdePlantilla);

        const agenteIndex = evaluacion.agentes.findIndex(function (a) {
            return a.idAgente.toString() === idAgente;
        });

        if (agenteIndex === -1) {
            console.log('❌ Agente no encontrado en la evaluación');
            return res.status(404).json({ mensaje: 'Agente no encontrado en la evaluación.' });
        }

        console.log('✅ Agente encontrado en índice:', agenteIndex);

        evaluacion.agentes[agenteIndex].categorias = categoriasDesdePlantilla;

        await evaluacion.save();

        console.log('💾 Evaluación guardada con nuevas categorías');

        res.status(200).json({
            mensaje: 'Categorías e ítems agregados al agente.',
            evaluacion
        });

    } catch (error) {
        console.error('❌ Error al agregar categorías e ítems:', error && error.message, error && error.stack);
        res.status(500).json({
            mensaje: 'Error interno al agregar categorías',
            error: (error && error.message) || 'Error desconocido'
        });
    }
});

*/

router.post('/:idEvaluacionED/agente/:idAgente/categorias-desde-plantilla', async (req, res) => {
    console.log('➡️ Entró a la ruta POST /:idEvaluacionED/agente/:idAgente/categorias-desde-plantilla');

    try {
        const { idEvaluacionED, idAgente } = req.params;
        console.log('📌 Params:', { idEvaluacionED, idAgente });

        if (!mongoose.isValidObjectId(idEvaluacionED) || !mongoose.isValidObjectId(idAgente)) {
            console.log('❌ ID inválido');
            return res.status(400).json({ mensaje: 'ID inválido.' });
        }

        const evaluacion = await PlanillaEDEvaluacionModel.findById(idEvaluacionED);
        if (!evaluacion) {
            console.log('❌ Evaluación no encontrada');
            return res.status(404).json({ mensaje: 'Evaluación no encontrada.' });
        }

        console.log('✅ Evaluación encontrada:', evaluacion._id);

        const plantilla = await PlanillaEDModel.findById(evaluacion.idPlanillaED);
        if (!plantilla) {
            console.log('❌ Plantilla base no encontrada');
            return res.status(404).json({ mensaje: 'Plantilla base no encontrada.' });
        }

        console.log('✅ Plantilla encontrada:', plantilla._id);

        const categoriasDesdePlantilla = plantilla.categorias.map(cat => ({
            idCategoria: cat.categoria._id,
            descripcion: cat.descripcion,
            items: cat.items.map(item => ({
                //  idItems: item.idItems || generateUniqueIdSomehow(), // si no existe, crealo
                descripcion: item.descripcion,
                valor: 0
            }))
        }));

        console.log('📦 Categorías generadas desde plantilla:', categoriasDesdePlantilla);

        const agenteIndex = evaluacion.agentes.findIndex((a) => a.idAgente.toString() === idAgente);
        if (agenteIndex === -1) {
            console.log('❌ Agente no encontrado en la evaluación');
            return res.status(404).json({ mensaje: 'Agente no encontrado en la evaluación.' });
        }

        console.log('✅ Agente encontrado en índice:', agenteIndex);

        evaluacion.agentes[agenteIndex].categorias = categoriasDesdePlantilla;

        await evaluacion.save();

        console.log('💾 Evaluación guardada con nuevas categorías');

        return res.status(200).json({
            mensaje: 'Categorías e ítems agregados al agente.',
            evaluacion
        });

    } catch (error) {
        const mensajeError = (error && (error as any).message) || 'Error desconocido';
        const stackError = (error && (error as any).stack) || 'Sin stack';

        console.error('❌ Error al agregar categorías e ítems:', mensajeError, stackError);

        return res.status(500).json({
            mensaje: 'Error interno al agregar categorías',
            error: mensajeError
        });
    }


});



export default router;
