export class modItems {
    _id: string;
    descripcion: string;
    valor: Number

    constructor(_id: string, descripcion: string, valor: Number) {
        this._id = _id;
        this.descripcion = descripcion;
        this.valor = valor;
    }
}