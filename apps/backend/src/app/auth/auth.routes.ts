import * as express from 'express';
import { Request, Response } from 'express';

import { User } from '../users/user.schema'; // Asegúrate de que la ruta del modelo sea correcta
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { dni, password } = req.body;

    console.log('Se recibió una solicitud de login');
    console.log('Datos recibidos en el body:', req.body);

    try {
        // Buscar usuario por dni
        const user = await User.findOne({ dni });
        console.log('🔍 Resultado de búsqueda de usuario:', user);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseña ingresada
        const isMatch = await user.comparePassword(password);
        console.log('¿Contraseña coincide?:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear payload con los datos requeridos
        const payload = {
            id: user._id,
            dni: user.dni,
            legajo: user.legajo,
            nombre: user.nombre,
            rol: user.rol,
            idefector: user.idefector,
            idservicio: user.idservicio
        };

        console.log('Payload del token:', payload);

        // Generar token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        console.log('Token generado:', token);

        // Retornar token al fron
        res.json({
            token,
            user: payload
        });

    } catch (error) {
        console.error('❌ Error en la ruta /login:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


router.post('/register', async (req: Request, res: Response) => {
    const { dni, password, legajo, nombre, rol, idefector, idservicio, email } = req.body;


    console.log('Datos recibidos:', req.body); // 👉 Log del request

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ dni });
        console.log('🔍 Usuario existente:', existingUser); // 👉 Ver si ya existe

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const newUser = new User({
            dni,
            password,
            legajo,
            nombre,
            rol,
            idefector,
            idservicio,
            email
        });

        console.log('📦 Nuevo usuario a guardar:', newUser); // 👉 Antes de guardar

        await newUser.save(); // Guardar en la base de datos

        console.log('✅ Usuario guardado correctamente');

        res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
    } catch (error) {
        console.error('❌ Error al registrar usuario:', error); // 👉 Este muestra el error real
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, '-password'); // Excluir la contraseña
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id, '-password'); // Excluir la contraseña
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        // Buscar y eliminar el usuario por su ID
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado correctamente', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


export default router;
