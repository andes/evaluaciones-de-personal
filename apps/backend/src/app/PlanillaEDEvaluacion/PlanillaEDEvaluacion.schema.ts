import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Interface para ítems
const ItemEvaluacionSchema = new Schema(
    {
        idItems: { type: String, required: true },
        descripcion: { type: String, required: true },
        valor: { type: Number, required: true }
    },
    { _id: false }
);

// Interface para categorías
const CategoriaEvaluacionSchema = new Schema(
    {
        idCategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
        descripcion: { type: String, required: true },
        items: { type: [ItemEvaluacionSchema], default: [] }
    },
    { _id: false }
);

// Interface para agentes evaluados
const AgenteEvaluadoSchema = new Schema(
    {
        idAgente: { type: mongoose.Schema.Types.ObjectId, ref: 'Agente', required: true },
        nombreAgente: { type: String, required: true },
        categorias: { type: [CategoriaEvaluacionSchema], default: [] }
    },
    { _id: false }
);

// Esquema principal de evaluación
export interface IPlanillaEDEvaluacion extends mongoose.Document {
    idPlanillaED: mongoose.Schema.Types.ObjectId;
    periodo: Date;
    idAgenteEvaluador: mongoose.Schema.Types.ObjectId;
    nombreAgenteEvaluador: string;
    idEfector: mongoose.Schema.Types.ObjectId;
    efector: string;
    idServicio: mongoose.Schema.Types.ObjectId;
    servicio: string;
    usuario: string;
    fechaMod: Date;
    agentes: {
        idAgente: mongoose.Schema.Types.ObjectId;
        nombreAgente: string;
        categorias: {
            idCategoria: mongoose.Schema.Types.ObjectId;
            descripcion: string;
            items: {
                idItems: string;
                descripcion: string;
                valor: number;
            }[];
        }[];
    }[];
}

// Esquema general
const PlanillaEDEvaluacionSchema = new Schema<IPlanillaEDEvaluacion>(
    {
        idPlanillaED: { type: Schema.Types.ObjectId, ref: 'PlanillaED', required: true },
        periodo: {
            type: Date,
            required: true,
            validate: {
                validator: (d: Date) => d.getDate() === 1,
                message: 'El periodo debe corresponder al primer día del mes (solo mes y año)'
            }
        },
        idAgenteEvaluador: { type: Schema.Types.ObjectId, ref: 'Agente', required: true },
        nombreAgenteEvaluador: { type: String, required: true },
        idEfector: { type: Schema.Types.ObjectId, ref: 'Efector', required: true },
        efector: { type: String, required: true },
        idServicio: { type: Schema.Types.ObjectId, ref: 'Servicio', required: true },
        servicio: { type: String, required: true },
        usuario: { type: String, required: true },
        fechaMod: { type: Date, default: Date.now },
        agentes: { type: [AgenteEvaluadoSchema], default: [] }
    },
    { collection: 'planillaed_evaluaciones' }
);

// Exportación del modelo
export const PlanillaEDEvaluacionModel = mongoose.model<IPlanillaEDEvaluacion>(
    'PlanillaEDEvaluacion',
    PlanillaEDEvaluacionSchema,
    'planillaed_evaluaciones'
);

export { PlanillaEDEvaluacionSchema };
