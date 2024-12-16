import * as mongoose from 'mongoose';
import { IItem, ItemSchema } from '../../Items/schemas/items';


const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    descripcion: { type: String }
});

export interface ICategoriaItem extends mongoose.Document {
    descripcion: string;
    items: IItem[]; // Array de items en cada categoría
}


const CategoriaItemSchema = new Schema<ICategoriaItem>({
    descripcion: { type: String, required: true },
    items: [ItemSchema] // Subesquema de items
});



export const CategoriaItemModel = mongoose.model<ICategoriaItem>('CategoriaItems', CategoriaItemSchema, 'categoriaitems');
export { CategoriaItemSchema };

export const modelo = mongoose.model('categoriaItems', schema, 'categoriaitems');
//                                        formulario             tabla o collection
