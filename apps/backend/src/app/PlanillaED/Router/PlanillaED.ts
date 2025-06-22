import { Router, Request, Response } from 'express';
import { PlanillaEDModel } from '../Schemas/PlanillaED';
import { modelo as ItemsModel } from '../../Items/schemas/items';
const mongoose = require('mongoose');

const router = Router();

// Buscar planilla por efector y servicio
router.get('/planillasED/buscar-por-efector-servicio', async (req: Request, res: Response) => {
    try {
        let { idEfector, idServicio } = req.query;
        idEfector = String(idEfector);
        idServicio = String(idServicio);

        if (!mongoose.Types.ObjectId.isValid(idEfector) || !mongoose.Types.ObjectId.isValid(idServicio)) {
            return res.status(400).json({ message: 'IDs inválidos' });
        }

        const planilla = await PlanillaEDModel.findOne({
            idEfector: new mongoose.Types.ObjectId(idEfector),
            idServicio: new mongoose.Types.ObjectId(idServicio)
        })
            .populate('idEfector', 'nombre')
            .populate('idServicio', 'nombre')
            .populate('categorias.categoria', 'descripcion')
            .lean();

        if (!planilla) return res.status(404).json({ message: 'Planilla no encontrada' });

        res.json(planilla);
    } catch (error) {
        res.status(500).json({ message: 'Error interno', error });
    }
});


router.get('/planillasED/:idPlanilla/categorias/:idCategoria/items', async (req: Request, res: Response) => {
    try {
        const { idPlanilla, idCategoria } = req.params;

        // Buscar la planilla por ID y popular las categorías y sus ítems
        const planilla = await PlanillaEDModel.findById(idPlanilla)
            .populate('categorias.categoria')  // Asegúrate de que 'categorias.categoria' es un campo de referencia adecuado
            .lean();  // Usa .lean() para mejorar el rendimiento al no necesitar instanciar objetos de Mongoose

        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }

        // Filtrar la categoría específica dentro de la planilla
        const categoriaEncontrada = planilla.categorias.find(
            (cat: any) => String(cat.categoria._id) === String(idCategoria)  // Asegúrate de que se compara correctamente el ID
        );

        if (!categoriaEncontrada) {
            return res.status(404).json({ message: 'Categoría no encontrada en la planilla.' });
        }

        // Extraer los ítems con id, descripcion y valor
        const itemsFiltrados = categoriaEncontrada.items.map((item: any) => ({
            _id: item._id,  // Asegúrate de que 'item._id' es el campo correcto
            descripcion: item.descripcion,
            valor: item.valor,
        }));

        // Responder con los datos encontrados
        res.json({
            descripcionCategoria: categoriaEncontrada.descripcion,  // Devolver la descripción de la categoría
            items: itemsFiltrados  // Devolver los ítems filtrados
        });
    } catch (error) {
        console.error('Error al obtener los ítems de la categoría:', error);
        res.status(500).json({ message: 'Error al obtener los ítems de la categoría.', error });
    }
});


router.post('/planillasED', async (req, res) => {
    try {
        const { idEfector, idServicio, descripcion } = req.body;

        // Verificar si ya existe una planilla con el mismo idEfector e idServicio
        const planillaExistente = await PlanillaEDModel.findOne({ idEfector, idServicio });

        if (planillaExistente) {
            return res.status(400).json({ message: 'Ya existe una planilla con este Efector y Servicio.' });
        }

        // Si no existe, crear una nueva planilla
        const nuevaPlanilla = new PlanillaEDModel({
            idEfector,
            idServicio,
            descripcion,
            fechaCreacion: new Date(),
            categorias: [],
        });

        const planillaGuardada = await nuevaPlanilla.save();
        res.status(201).json(planillaGuardada);
    } catch (error) {
        console.error('Error al crear la planilla:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


// Obtener todas las planillas
router.get('/planillasED', async (req: Request, res: Response) => {
    try {
        const planillas = await PlanillaEDModel.find()
            .populate('categorias.categoria')
            .populate('idEfector', 'nombre')
            .populate('idServicio', 'nombre')
            .lean();

        planillas.forEach(planilla => {
            if (Array.isArray(planilla.categorias)) {
                planilla.categorias.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
            }
        });

        res.json(planillas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener planillas', error });
    }
});

// Obtener planilla por ID
router.get('/planillasED/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const planilla = await PlanillaEDModel.findById(id)
            .populate('idEfector', 'nombre')
            .populate('idServicio', 'nombre')
            .populate('categorias.categoria', 'descripcion')
            .lean();

        if (!planilla) return res.status(404).json({ message: 'Planilla no encontrada' });

        res.json(planilla);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener planilla', error });
    }
});

// Crear nueva planilla
router.post('/planillasED', async (req: Request, res: Response) => {
    try {
        const { idEfector, idServicio, descripcion } = req.body;

        const existe = await PlanillaEDModel.findOne({ idEfector, idServicio });
        if (existe) return res.status(400).json({ message: 'Ya existe una planilla para este efector y servicio' });

        const nueva = new PlanillaEDModel({ idEfector, idServicio, descripcion, fechaCreacion: new Date(), categorias: [] });
        const guardada = await nueva.save();
        res.status(201).json(guardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear planilla', error });
    }
});

// Actualizar planilla (agregar o modificar categoría)
router.put('/planillasED/:id/categorias', async (req: Request, res: Response) => {
    try {
        const { categoria, descripcionCategoria, items } = req.body;
        const { id } = req.params;

        if (!categoria || !descripcionCategoria || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        const planilla = await PlanillaEDModel.findById(id);
        if (!planilla) return res.status(404).json({ message: 'Planilla no encontrada' });

        const existente = planilla.categorias.find(cat => String(cat.categoria) === String(categoria));
        if (existente) {
            existente.descripcion = descripcionCategoria;
            const nuevos = items.filter(item => !existente.items.some(i => String(i._id) === String(item._id)));
            existente.items = [...existente.items, ...nuevos];
        } else {
            planilla.categorias.push({ categoria, descripcion: descripcionCategoria, items });
        }

        await planilla.save();
        res.json({ message: 'Planilla actualizada', planilla });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar', error });
    }
});

// Eliminar todas las planillas
router.delete('/planillasED', async (_req: Request, res: Response) => {
    try {
        const result = await PlanillaEDModel.deleteMany({});
        res.json({ message: 'Planillas eliminadas', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar planillas', error });
    }
});

// Obtener categorías de una planilla
router.get('/planillasED/:id/categorias', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const planilla = await PlanillaEDModel.findById(id).populate('categorias.categoria').lean();

        if (!planilla) return res.status(404).json({ message: 'Planilla no encontrada' });

        const resumen = planilla.categorias.map(cat => ({
            id: cat.categoria._id,
            descripcion: cat.categoria.descripcion,
            totalItems: cat.items.length
        }));

        res.json({ planillaId: id, descripcion: planilla.descripcion, categorias: resumen });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías', error });
    }
});

// Obtener ítems disponibles (no usados en la planilla)
router.get('/planillasED/:idDocumento/items-disponibles', async (req: Request, res: Response) => {
    try {
        const { idDocumento } = req.params;
        const planilla = await PlanillaEDModel.findById(idDocumento).lean();

        if (!planilla) return res.status(404).json({ message: 'Planilla no encontrada' });

        const usados = planilla.categorias.flatMap(cat => cat.items.map(item => String(item._id)));
        const disponibles = await ItemsModel.find({ _id: { $nin: usados } }).sort({ descripcion: 1 }).lean();

        res.json({ items: disponibles });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ítems disponibles', error });
    }
});

// Verificar existencia de ítem por descripción
router.get('/planillasED/:idPlanilla/items/existe', async (req: Request, res: Response) => {
    try {
        const { idPlanilla } = req.params;
        const { itemDesc } = req.query;

        if (!itemDesc || typeof itemDesc !== 'string') {
            return res.status(400).json({ message: 'Parámetro itemDesc requerido' });
        }

        const planilla = await PlanillaEDModel.findById(idPlanilla).lean();
        if (!planilla) return res.status(404).json({ message: 'Planilla no encontrada' });

        const exists = planilla.categorias.some(cat =>
            cat.items.some(item =>
                typeof item.descripcion === 'string' &&
                item.descripcion.toLowerCase().trim() === itemDesc.toLowerCase().trim()
            )
        );


        res.json({ exists });
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar ítem', error });
    }
});

// Eliminar un ítem por descripción
router.delete('/eliminar-item', async (req: Request, res: Response) => {
    try {
        const { idDocumento, descripcionItem } = req.body;

        if (!idDocumento || !descripcionItem) {
            return res.status(400).json({ message: 'Se requieren idDocumento y descripcionItem' });
        }

        const result = await PlanillaEDModel.findOneAndUpdate(
            { _id: idDocumento },
            { $pull: { 'categorias.$[].items': { descripcion: descripcionItem } } },
            { new: true }
        );

        if (!result) return res.status(404).json({ message: 'Documento no encontrado' });

        res.json({ message: 'Ítem eliminado', resultado: result });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar ítem', error });
    }
});

export default router;
