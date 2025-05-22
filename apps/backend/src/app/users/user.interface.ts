import { Document, Types } from 'mongoose';

interface IDisclaimer {
    createdAt: Date;
    _id: Types.ObjectId;
}
export interface IUser extends Document {
    active: boolean;
    dni: string;
    legajo: string;
    rol: string;
    idefector: { id: string };
    idservicio: { id: string };
    nombre: string;
    apellido: string;
    documento: string;
    email: string;
    telefono: string;
    password: string;
    permisos: string[];
    validationToken: string;
    disclaimers: IDisclaimer[];
    comparePassword(passwordAttempt: string): Promise<boolean>;
}
