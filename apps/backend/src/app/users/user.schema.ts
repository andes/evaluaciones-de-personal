import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from './user.interface';

const UserSchema = new Schema({
    dni: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    legajo: { type: String },
    nombre: { type: String },
    rol: { type: String },
    idefector: { type: Schema.Types.ObjectId, ref: 'efectores' },
    idservicio: { type: Schema.Types.ObjectId, ref: 'servicios' },
    email: { type: String, required: true, unique: true }  // 
});


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


UserSchema.methods.comparePassword = async function (this: IUser, candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', UserSchema);
