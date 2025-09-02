import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 🔹 Subesquema para los ítems
const ItemSchema = new Schema({
    idItem: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'configEvaDesemp'   // Nombre exacto de tu modelo
    },
    descripcion: { type: String, required: true },
    puntaje: { type: Number, required: true }
});

// 🔹 Subesquema para las categorías
const CategoriaSchema = new Schema({
    idCategoria: { type: Schema.Types.ObjectId, required: true, ref: 'CategoriaItem' },
    descripcionCategoria: { type: String, required: true },
    items: { type: [ItemSchema], required: true }
});

// 🔹 Subesquema para Tipo de Cierre Evaluación
const TipoCierreEvaluacionSchema = new Schema({
    idTipoCierreEvaluacion: { type: Schema.Types.ObjectId, ref: 'TipoCierreEvaluacion', required: true },
    nombreTipoCierreEvaluacion: { type: String, required: true },
    detalle: { type: String, default: '' },
    fechaCierre: { type: Date, default: Date.now },
    descripcion: { type: String, default: '' }
}, { _id: false });

// 🔹 Schema principal para Evaluación Detalle
const EvaluacionDetalleSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    idPlanillaEvaluacionCabecera: { type: Schema.Types.ObjectId, required: true, ref: 'PlanillaEDCabecera' },

    agenteEvaluado: {
        idAgenteEvaluado: { type: Schema.Types.ObjectId, required: true, ref: 'Agente' },
        nombreAgenteEvaluado: { type: String, required: true },
        legajo: { type: String, required: true }  // <-- agregado
    },

    // 👇 Nuevo campo: tipo de cierre de la evaluación
    tipoCierreEvaluacion: { type: TipoCierreEvaluacionSchema },

    categorias: { type: [CategoriaSchema], required: true }
});

// Exportamos el modelo
export const EvaluacionDetalleModel = mongoose.model('EvaluacionDetalle', EvaluacionDetalleSchema);
