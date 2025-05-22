import * as mongoose from 'mongoose';
import { ICategoriaItem } from '../../categoriaitems/schemas/categoriaItems';  // No es necesario importar CategoriaItemSchema aquí
import { IItem } from '../../Items/schemas/items';  // Deberías importar IItem si lo necesitas

//  '../models/PlanillaModel';

const Schema = mongoose.Schema;

// Interfaz extendida para incluir categorías e ítems
export interface IPlanillaED extends mongoose.Document {
    fechaCreacion: Date;
    idEfector: mongoose.Schema.Types.ObjectId;
    descripcion: string;
    idServicio: mongoose.Schema.Types.ObjectId;
    categorias: {
        descripcion: string;          // Descripción de la categoría
        categoria: ICategoriaItem;   // Referencia a la categoría
        items: {
            _id: string;
            descripcion: string;      // Descripción del ítem
            valor: number;            // Valor del ítem
        }[];                         // Arreglo de ítems dentro de la categoría con descripción y valor
    }[];
}

// Esquema de la categoría, ahora incluye la descripción y los ítems con descripción y valor
const CategoriaSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'CategoriaItem', required: true },  // Referencia al modelo CategoriaItem
    descripcion: { type: String, required: true },  // Descripción de la categoría
    items: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Item' },  // Referencia al modelo Item
        descripcion: { type: String, required: true },      // Descripción del ítem
        valor: { type: Number, required: true }             // Valor del ítem
    }]
});

// Esquema para la planilla, incluyendo las categorías y los ítems con sus descripciones y valores
const PlanillaEDSchema = new Schema({
    fechaCreacion: { type: Date, required: true },
    descripcion: { type: String, required: true },
    idEfector: { type: Schema.Types.ObjectId, ref: 'Efectores', required: true },
    idServicio: { type: Schema.Types.ObjectId, ref: 'Servicios', required: true },
    categorias: [CategoriaSchema]  // Arreglo de categorías, que contiene ítems con descripciones y valores
});

// Exportar el modelo de Mongoose para la planilla
export const PlanillaEDModel = mongoose.model<IPlanillaED>('PlanillaED', PlanillaEDSchema, 'planillaed');
