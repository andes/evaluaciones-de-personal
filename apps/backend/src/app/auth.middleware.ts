// src/app/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extender Request para poder guardar user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer token"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // guardás los datos del token para usar después
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
