import { Router } from 'express';

import { EfectorModel } from '../schemas/efectores';


const router = Router();


router.get('/rmEfectores', async (req, res, next) => {
    try {
        const data = await EfectorModel.find().sort({ descripcion: 1 }); // 1 para orden ascendente

        res.json(data);
    } catch (error) {
        console.error('Error al obtener los Efectores:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});


router.get('/rmEfectores/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await EfectorModel.findById(id);
    res.json(respuesta);
});

export default router;

