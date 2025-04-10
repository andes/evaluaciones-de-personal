import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PlanillaEDSchema = new Schema({
    descripcion: { type: String, required: true },
    efector: { type: mongoose.Schema.Types.ObjectId, ref: 'Efectores', required: true },
    servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicios', required: true },
    fechaCreacion: { type: Date, default: Date.now },
});

export const PlanillaEDModel = mongoose.model('PlanillaED', PlanillaEDSchema);
