import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    idItem: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'configEvaDesemp'   // Aquí el nombre exacto de tu modelo
    },
    descripcion: { type: String, required: true },
    puntaje: { type: Number, required: true }
});


const CategoriaSchema = new Schema({
    idCategoria: { type: Schema.Types.ObjectId, required: true, ref: 'CategoriaItem' },
    descripcionCategoria: { type: String, required: true },
    items: { type: [ItemSchema], required: true }
});

const EvaluacionDetalleSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    idPlanillaEvaluacionCabecera: { type: Schema.Types.ObjectId, required: true, ref: 'PlanillaEDCabecera' },
    agenteEvaluado: {
        idAgenteEvaluado: { type: Schema.Types.ObjectId, required: true, ref: 'Agente' },
        nombreAgenteEvaluado: { type: String, required: true }
    },
    categorias: { type: [CategoriaSchema], required: true }
});



export const EvaluacionDetalleModel = mongoose.model('EvaluacionDetalle', EvaluacionDetalleSchema);
