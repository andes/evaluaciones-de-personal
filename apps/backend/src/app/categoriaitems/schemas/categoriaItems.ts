import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({

    descripcion: { type: String }

});

export const modelo = mongoose.model('categoriaItems', schema, 'categoriaitems');
//                                        formulario             tabla o collection
