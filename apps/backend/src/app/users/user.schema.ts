import { Schema, Types, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from './user.interface';  // Asegúrate de que la interfaz existe y está correctamente exportada

const UserSchema = new Schema<IUser>({
    dni: { type: String, required: true, unique: true },
    legajo: { type: String, required: true },
    nombre: { type: String, required: true },
    rol: { type: String, required: true },
    email: { type: String },
    idefector: { type: Types.ObjectId, ref: 'efectores', required: true },   // ← CAMBIADO
    idservicio: { type: Types.ObjectId, ref: 'servicios', required: true },  // ← CAMBIADO
    password: { type: String, required: true }
});


// Pre-save para encriptar la contraseña
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as any);
    }
});

// Método para comparar la contraseña ingresada con la encriptada
UserSchema.methods.comparePassword = async function (this: IUser, candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Exporta el modelo correctamente con un nombre explícito
export const User = model<IUser>('User', UserSchema);
