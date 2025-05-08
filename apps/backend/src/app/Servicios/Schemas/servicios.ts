import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IServicio extends mongoose.Document {
    nombre: string;
}

const ServicioSchema = new Schema<IServicio>({
    nombre: { type: String, required: true }
});

export const ServicioModel = mongoose.model<IServicio>('Servicios', ServicioSchema, 'servicios');

export { ServicioSchema };
