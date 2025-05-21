import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

// Subschema para los ítems
const ItemSchema = new Schema({
    idItem: { type: mongoose.Types.ObjectId, required: true },
    nombreItem: { type: String, required: true },
    valor: { type: Number, required: true }
}, { _id: false });

// Subschema para las categorías que contienen ítems
const CategoriaSchema = new Schema({
    idCategoria: { type: mongoose.Types.ObjectId, required: true },
    nombreCategoria: { type: String, required: true },
    items: [ItemSchema]
}, { _id: false });

// Esquema principal del detalle de evaluación
const PlanillaEvaluacionDetSchema = new Schema({
    idPlanillaEvaluacion: {
        type: mongoose.Types.ObjectId,
        ref: 'PlanillaEvaluacion',
        required: true
    },
    idAgente: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    categorias: [CategoriaSchema]
});

export const PlanillaEvaluacionDetModel = mongoose.model(
    'PlanillaEvaluacionDet',
    PlanillaEvaluacionDetSchema
);
