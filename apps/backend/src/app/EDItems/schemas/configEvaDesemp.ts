import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    descripcion: { type: String },
    valor: { type: Number },
    idCategoriaItems: { type: mongoose.Schema.Types.ObjectId }
});

export const modelo = mongoose.model('configEvaDesemp', schema, 'edItems');
