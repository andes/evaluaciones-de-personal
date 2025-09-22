import * as mongoose from 'mongoose';
import { ICategoriaItem } from '../../categoriaitems/schemas/categoriaItems';

const Schema = mongoose.Schema;

// Interfaz para el tipo de evaluación
interface TipoEvaluacion {
    idTipoEvaluacion: mongoose.Types.ObjectId;
    nombre: string;
}

// Interfaz extendida para incluir categorías e ítems y tipoEvaluacion
export interface IPlanillaED extends mongoose.Document {
    fechaCreacion: Date;
    idEfector: mongoose.Schema.Types.ObjectId;
    descripcion: string;
    idServicio: mongoose.Schema.Types.ObjectId;
    tipoEvaluacion: TipoEvaluacion;  // Nuevo campo agregado
    categorias: {
        descripcion: string;
        categoria: ICategoriaItem;
        items: {
            _id: string;
            descripcion: string;
            valor: number;
        }[];
    }[];
}

// Esquema de la categoría
const CategoriaSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'CategoriaItem', required: true },
    descripcion: { type: String, required: true },
    items: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Item' },
        descripcion: { type: String, required: true },
        valor: { type: Number, required: true }
    }]
});

// Esquema para la planilla, incluyendo el nuevo campo tipoEvaluacion
const PlanillaEDSchema = new Schema({
    fechaCreacion: { type: Date, required: true },
    descripcion: { type: String, required: true },
    idEfector: { type: Schema.Types.ObjectId, ref: 'Efectores', required: true },
    idServicio: { type: Schema.Types.ObjectId, ref: 'Servicios', required: true },
    tipoEvaluacion: {
        idTipoEvaluacion: { type: Schema.Types.ObjectId, ref: 'TipoEvaluacion', required: true },
        nombre: { type: String, required: true }
    },
    categorias: [CategoriaSchema]
});

// Exportar el modelo
export const PlanillaEDModel = mongoose.model<IPlanillaED>('PlanillaED', PlanillaEDSchema, 'planillaed');
