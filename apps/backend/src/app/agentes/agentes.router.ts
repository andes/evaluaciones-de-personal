import { Router } from 'express';
import { AgenteModel } from './agentes.schema';
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';

const router = Router();

// listar
router.get('/rAgentes', async (req, res) => {
    try {
        const data = await AgenteModel.find().sort({ nombre: 1 });
        res.json(data);
    } catch (error) {
        console.error('Error al obtener los agentes:', error);
        res.status(500).json({ error: 'Error al obtener los agentes' });
    }
});

// buscar por id
router.get('/rAgentes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const agente = await AgenteModel.findById(id);
        if (!agente) return res.status(404).json({ error: 'Agente no encontrado' });
        res.json(agente);
    } catch (error) {
        console.error('Error al buscar agente por ID:', error);
        res.status(500).json({ error: 'Error al buscar agente' });
    }
});

// nuevo
router.post('/rAgentes', async (req, res) => {
    try {
        const nuevoAgente = await AgenteModel.create(req.body);
        res.status(201).json(nuevoAgente);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'El legajo o DNI ya está registrado'
            });
        }
        console.error('Error al crear el agente:', error);
        res.status(500).json({ error: 'Error al crear el agente' });
    }
});

router.put('/rAgentes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { legajo, dni, nombre } = req.body;

        // Obtener el agente actual
        const agenteActual = await AgenteModel.findById(id);
        if (!agenteActual) {
            return res.status(404).json({ error: 'Agente no encontrado' });
        }

        // Validar legajo solo si cambió (y excluyendo el actual _id)
        if (legajo && legajo !== agenteActual.legajo) {
            const existeLegajo = await AgenteModel.findOne({ legajo, _id: { $ne: id } });
            if (existeLegajo) {
                return res.status(400).json({ error: 'Ya existe un agente con el mismo legajo.' });
            }
        }

        // Validar dni solo si cambió (y excluyendo el actual _id)
        if (dni && dni !== agenteActual.dni) {
            const existeDni = await AgenteModel.findOne({ dni, _id: { $ne: id } });
            if (existeDni) {
                return res.status(400).json({ error: 'Ya existe un agente con el mismo DNI.' });
            }
        }

        // Actualizar
        const actualizado = await AgenteModel.findByIdAndUpdate(id, { nombre, dni, legajo }, { new: true });
        res.json(actualizado);

    } catch (error) {
        console.error('Error al actualizar el agente:', error);
        res.status(500).json({ error: 'Error al actualizar el agente' });
    }
});

//  Eliminar 
router.delete('/rAgentes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const eliminado = await AgenteModel.findByIdAndDelete(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Agente no encontrado' });
        }
        res.json({ message: 'Agente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el agente:', error);
        res.status(500).json({ error: 'Error al eliminar el agente' });
    }
});

// Ruta para importar agentes CSV
router.post('/rAgentes/importar-csv', async (req, res) => {
    const filePath = path.join('/home/andes', 'Descargas', 'agentes.csv'); // Ubicación del CSV

    const agentesNuevos: any[] = [];

    try {
        fs.createReadStream(filePath)
            .pipe(csvParser({ separator: ',' }))
            .on('data', async (row) => {
                const nombre = row['AGENTE'];
                const dni = parseInt(row['DNI']);
                const legajo = parseInt(row['LEGAJO']);

                if (!nombre || !dni || !legajo) return;

                // Buscamos si ya existe ese legajo
                const existente = await AgenteModel.findOne({ legajo: legajo.toString() });
                if (!existente) {
                    agentesNuevos.push({ nombre, dni, legajo });
                }
            })
            .on('end', async () => {
                try {
                    if (agentesNuevos.length > 0) {
                        await AgenteModel.insertMany(agentesNuevos);
                        res.json({ message: 'Importación completa', insertados: agentesNuevos.length });
                    } else {
                        res.json({ message: 'No hay nuevos agentes para importar.' });
                    }
                } catch (err) {
                    console.error('Error al insertar nuevos agentes:', err);
                    res.status(500).json({ error: 'Error al insertar nuevos agentes.' });
                }
            });
    } catch (err) {
        console.error('Error al procesar el archivo CSV:', err);
        res.status(500).json({ error: 'Error al procesar el archivo CSV.' });
    }
});



export default router;
