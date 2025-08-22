import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Subesquema para los ítems
const ItemSchema = new Schema({
    idItem: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'configEvaDesemp'   // Nombre exacto de tu modelo
    },
    descripcion: { type: String, required: true },
    puntaje: { type: Number, required: true }
});

// Subesquema para las categorías
const CategoriaSchema = new Schema({
    idCategoria: { type: Schema.Types.ObjectId, required: true, ref: 'CategoriaItem' },
    descripcionCategoria: { type: String, required: true },
    items: { type: [ItemSchema], required: true }
});

// Schema principal para Evaluación Detalle
const EvaluacionDetalleSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    idPlanillaEvaluacionCabecera: { type: Schema.Types.ObjectId, required: true, ref: 'PlanillaEDCabecera' },
    agenteEvaluado: {
        idAgenteEvaluado: { type: Schema.Types.ObjectId, required: true, ref: 'Agente' },
        nombreAgenteEvaluado: { type: String, required: true },
        legajo: { type: String, required: true }  // <-- agregado
    },
    categorias: { type: [CategoriaSchema], required: true }
});

// Exportamos el modelo
export const EvaluacionDetalleModel = mongoose.model('EvaluacionDetalle', EvaluacionDetalleSchema);
