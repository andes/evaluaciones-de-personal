export class modAgente {
    _id: string;
    legajo: string;
    dni: string;
    nombre: string;

    constructor(_id: string, legajo: string, dni: string, nombre: string) {
        this._id = _id;
        this.legajo = legajo;
        this.dni = dni;
        this.nombre = nombre;
    }
}
