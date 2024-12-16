import * as mongoose from 'mongoose';
import { ICategoriaItem, CategoriaItemSchema } from '../../categoriaitems/schemas/categoriaItems';


const Schema = mongoose.Schema;

export interface IPlanillaED extends mongoose.Document {
    fechaCreacion: Date;
    idEfector: mongoose.Schema.Types.ObjectId;
    descripcion: string;
    idServicio: mongoose.Schema.Types.ObjectId;
}

const PlanillaEDSchema = new mongoose.Schema({
    fechaCreacion: { type: Date, default: Date.now },
    idEfector: { type: mongoose.Schema.Types.ObjectId, ref: 'Efector', required: true },
    idServicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
    descripcion: { type: String, required: true }
});


export const PlanillaEDModel = mongoose.model<IPlanillaED>('PlanillaED', PlanillaEDSchema, 'planillaed');
