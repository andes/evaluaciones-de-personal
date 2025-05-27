import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    descripcion: { type: String },
    valor: { type: Number },
});

export const modelo = mongoose.model('items', schema, 'edItems');

const Schema = mongoose.Schema;

export interface IItem extends mongoose.Document {
    descripcion: string;
    valor: number;
}

const ItemSchema = new Schema<IItem>({
    descripcion: { type: String, required: true },
    valor: { type: Number, required: true }
});

export const ItemModel = mongoose.model<IItem>('Items', ItemSchema, 'edItems');
export { ItemSchema };
