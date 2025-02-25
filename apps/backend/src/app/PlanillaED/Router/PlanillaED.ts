import { Router, Request, Response } from 'express';
import { PlanillaEDModel } from '../Schemas/PlanillaED';
import { modelo as ItemsModel } from '../../Items/schemas/items';

const router = Router();

// lista todos los datos del documento segun id enviado para listado o pdf

router.get('/planillasED/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Buscar la planilla por ID y popular las referencias de efector, servicio y categoría
        const planilla = await PlanillaEDModel.findById(id)
            .populate({ path: 'idEfector', select: 'nombre' })   // Trae la 'descripcion' del Efector
            .populate({ path: 'idServicio', select: 'nombre' })  // Trae la 'descripcion' del Servicio
            .populate({ path: 'categorias.categoria', select: 'descripcion' }) // Trae la 'descripcion' de la categoría
            .lean();

        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }

        res.json(planilla);
    } catch (error) {
        console.error('Error al obtener la planilla:', error);
        res.status(500).json({ message: 'Error al obtener la planilla.', error });
    }
});


//





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

/*
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
*/

router.get('/planillasED', async (req: Request, res: Response) => {
    try {
        const planillas = await PlanillaEDModel.find()
            .populate('categorias.categoria')
            .populate('idEfector', 'nombre')   // Popula el efector y obtiene solo el campo "nombre"
            .populate('idServicio', 'nombre')  // Popula el servicio y obtiene solo el campo "nombre"
            .lean();

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

// Eliminar una planilla por ID
router.delete('/planillasED/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await PlanillaEDModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }

        res.json({ message: 'Planilla eliminada correctamente.', deletedPlanilla: result });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la planilla.', error });
    }
});


/**
 */
router.get('/planillasED/:idDocumento/items-disponibles', async (req: Request, res: Response) => {
    try {
        const { idDocumento } = req.params;

        // Buscar el documento (planilla) por su ID
        const planilla = await PlanillaEDModel.findById(idDocumento).lean();
        if (!planilla) {
            return res.status(404).json({ message: 'Documento no encontrado.' });
        }

        // Recolectar todos los IDs de ítems que ya están asociados en la planilla.
        // Se asume que la planilla tiene un arreglo "categorias" y cada categoría tiene un arreglo "items"
        const itemIdsEnDocumento: string[] = [];
        if (planilla.categorias && Array.isArray(planilla.categorias)) {
            planilla.categorias.forEach((cat: any) => {
                if (cat.items && Array.isArray(cat.items)) {
                    cat.items.forEach((item: any) => {
                        // Se asegura de convertir el _id a string
                        itemIdsEnDocumento.push(String(item._id));
                    });
                }
            });
        }

        // Consultar en la colección de ítems todos aquellos que NO se encuentren en itemIdsEnDocumento
        const itemsDisponibles = await ItemsModel.find({ _id: { $nin: itemIdsEnDocumento } })
            .sort({ descripcion: 1 })
            .lean();

        res.json({ items: itemsDisponibles });
    } catch (error) {
        console.error('Error al obtener los ítems disponibles:', error);
        res.status(500).json({ message: 'Error en el servidor.', error });
    }





});
// items duplicado en documento (buscando por descripción)
router.get('/planillasED/:idPlanilla/items/existe', async (req: Request, res: Response) => {
    try {
        const { idPlanilla } = req.params;
        const { itemDesc } = req.query; // Cambiamos el nombre a itemDesc

        // Validar que se haya enviado el itemDesc y que sea una cadena
        if (!itemDesc || typeof itemDesc !== 'string') {
            return res.status(400).json({ message: 'El parámetro itemDesc es requerido y debe ser una cadena.' });
        }

        // Buscar la planilla por su ID
        const planilla = await PlanillaEDModel.findById(idPlanilla).lean();
        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }

        // Recorrer todas las categorías y sus ítems para ver si alguno coincide con la descripción (comparación insensible a mayúsculas/minúsculas)
        let exists = false;
        if (planilla.categorias && Array.isArray(planilla.categorias)) {
            for (const categoria of planilla.categorias) {
                if (categoria.items && Array.isArray(categoria.items)) {
                    const found = categoria.items.some((item: any) => {
                        // Usamos toLowerCase y trim para comparar de forma más robusta
                        return item.descripcion && item.descripcion.toLowerCase().trim() === itemDesc.toLowerCase().trim();
                    });
                    if (found) {
                        exists = true;
                        break;
                    }
                }
            }
        }

        // Responder indicando si el ítem (por descripción) existe o no en el documento
        return res.json({ exists });
    } catch (error) {
        console.error('Error al verificar existencia del ítem en la planilla:', error);
        return res.status(500).json({ message: 'Error en el servidor.', error });
    }
});

// Ruta para eliminar un ítem de una categoría dentro de un documento específico
router.delete('/eliminar-item', async (req, res) => {
    try {
        const { idDocumento, descripcionItem } = req.body;

        // Validar que se hayan enviado ambos parámetros
        if (!idDocumento || !descripcionItem) {
            return res.status(400).json({ message: "Se requieren idDocumento y descripcionItem" });
        }

        // Buscar el documento por id y eliminar el ítem de todas las categorías donde aparezca
        const resultado = await PlanillaEDModel.findOneAndUpdate(
            { _id: idDocumento },
            { $pull: { "categorias.$[].items": { descripcion: descripcionItem } } },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el documento
        if (!resultado) {
            return res.status(404).json({ message: "Documento no encontrado" });
        }

        // Respuesta exitosa
        res.json({ message: "Ítem eliminado correctamente", resultado });

    } catch (error) {
        console.error("Error al eliminar ítem:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


export default router;
