import { Router, Request, Response } from 'express';
import { PlanillaEDModel } from '../Schemas/PlanillaED';

const router = Router();

router.post('/planillasED', async (req: Request, res: Response) => {
    console.log('Datos recibidos en la solicitud:', req.body);

    const { descripcion, idEfector, idServicio, categorias } = req.body;

    if (!descripcion || !idEfector || !idServicio) {
        console.error('Error: Faltan campos obligatorios.');
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    // Asignar fechaCreacion si no se proporciona
    const fechaCreacion = req.body.fechaCreacion || new Date();

    try {
        const newPlanilla = new PlanillaEDModel({
            descripcion,
            idEfector,
            idServicio,
            categorias, // Se incluye el arreglo de categorías
            fechaCreacion // Asignar la fecha automáticamente si no se envió
        });

        const savedPlanilla = await newPlanilla.save();
        console.log('Planilla guardada con éxito:', savedPlanilla);

        res.status(201).json(savedPlanilla);
    } catch (error) {
        console.error('Error al guardar la planilla:', error);
        res.status(500).json({ message: 'Error al guardar la planilla.', error });
    }
});


// Obtener todas las planillas
router.get('/planillasED', async (req: Request, res: Response) => {
    try {
        const planillas = await PlanillaEDModel.find()
            .populate('categorias.categoria')
            .lean(); // Convertir a objetos JSON planos

        // Ordenar las categorías dentro de cada planilla
        planillas.forEach(planilla => {
            if (planilla.categorias && Array.isArray(planilla.categorias)) {
                planilla.categorias.sort((a, b) =>
                    a.descripcion.localeCompare(b.descripcion)
                );
            }
        });

        res.json(planillas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las planillas.', error });
    }
});

// Obtener categorías e ítems de una planilla específica
router.get('/planillasED/:id/categorias', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Buscar la planilla por ID y popular las categorías
        const planilla = await PlanillaEDModel.findById(id)
            .populate('categorias.categoria')
            .lean();

        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }

        // Agrupar categorías con el conteo de ítems
        const categoriasResumen = planilla.categorias.map((categoria: any) => ({
            id: categoria.categoria._id, // ID de la categoría
            descripcion: categoria.categoria.descripcion, // Descripción de la categoría
            totalItems: categoria.items.length // Total de ítems en la categoría
        }));

        res.json({
            planillaId: id,
            descripcion: planilla.descripcion,
            categorias: categoriasResumen,
        });
    } catch (error) {
        console.error('Error al obtener categorías y total de ítems:', error);
        res.status(500).json({ message: 'Error al obtener categorías y total de ítems.', error });
    }
});

// Agregar un console.log en la ruta del PUT
router.put('/planillasED/:id/categorias', async (req: Request, res: Response) => {
    try {
        const { categoria, descripcionCategoria, items } = req.body;

        // Verificar que los datos están bien estructurados
        if (!categoria || !descripcionCategoria || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Faltan datos: categoría, descripción o ítems.' });
        }

        // Buscar la planilla por ID
        const planilla = await PlanillaEDModel.findById(req.params.id);
        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }

        // Buscar si la categoría ya existe en la planilla
        const categoriaExistente = planilla.categorias.find((cat: any) => String(cat.categoria) === String(categoria));

        if (categoriaExistente) {
            // Actualizar la descripción
            categoriaExistente.descripcion = descripcionCategoria;

            // Filtrar ítems nuevos y agregarlos
            const nuevosItems = items.filter((item: any) =>
                !categoriaExistente.items.some((itemExistente: any) => String(itemExistente.id) === String(item.id))
            );

            if (nuevosItems.length > 0) {
                categoriaExistente.items = [...categoriaExistente.items, ...nuevosItems];
            }
        } else {
            // Si la categoría no existe, agregarla
            planilla.categorias.push({ categoria, descripcion: descripcionCategoria, items });
        }

        // Guardar los cambios en la base de datos
        await planilla.save();
        res.status(200).json({ message: 'Planilla actualizada exitosamente', planilla });
    } catch (error) {
        console.error('Error al actualizar la planilla:', error.message);
        res.status(500).json({ message: 'Error interno al actualizar la planilla.', error: error.message });
    }
});


// Eliminar todas las planillas
router.delete('/planillasED', async (req: Request, res: Response) => {
    try {
        const result = await PlanillaEDModel.deleteMany({});
        res.json({
            message: 'Todas las planillas han sido eliminadas.',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar todas las planillas.', error });
    }
});

export default router;
