import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//  agente evaluador — ahora objeto único
interface IAgenteEvaluador {
    idUsuarioEvaluador: mongoose.Types.ObjectId;
    nombreUsuarioEvaluador: string;
}

// efector
interface IEfector {
    idEfector: mongoose.Types.ObjectId;
    nombre: string;
}

// servicio
interface IServicio {
    idServicio: mongoose.Types.ObjectId;
    nombre: string;
}

// tipo de cierre de evaluación
interface ITipoCierreEvaluacion {
    id: mongoose.Types.ObjectId;
    nombre: string;
}

// Interfaz principal
export interface IPlanillaEvaluacionCabecera extends mongoose.Document {
    periodo: Date;
    agenteevaluador: IAgenteEvaluador;
    Efector: IEfector;
    Servicio: IServicio;
    fechaCierre?: Date; // <-- campo nuevo agregado
    tipoCierreEvaluacion?: ITipoCierreEvaluacion;
    usuario: string;
    fechaMod: Date;
}

// Schema actualizado
const PlanillaEvaluacionCabeceraSchema = new Schema<IPlanillaEvaluacionCabecera>(
    {
        periodo: {
            type: Date,
            required: true
        },
        agenteevaluador: {
            idUsuarioEvaluador: {
                type: Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true
            },
            nombreUsuarioEvaluador: {
                type: String,
                required: true
            }
        },
        Efector: {
            type: {
                idEfector: {
                    type: Schema.Types.ObjectId,
                    ref: 'Efector',
                    required: true
                },
                nombre: {
                    type: String,
                    required: true
                }
            },
            required: true
        },
        Servicio: {
            type: {
                idServicio: {
                    type: Schema.Types.ObjectId,
                    ref: 'Servicio',
                    required: true
                },
                nombre: {
                    type: String,
                    required: true
                }
            },
            required: true
        },
        // 👇 campo nuevo
        fechaCierre: {
            type: Date
        },
        tipoCierreEvaluacion: {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'TipoCierreEvaluacion'
            },
            nombre: {
                type: String
            }
        },
        usuario: {
            type: String,
            required: true
        },
        fechaMod: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'planilla_evaluacion_cabecera',
        timestamps: false,
        versionKey: false
    }
);

// Exportación del modelo
export const PlanillaEvaluacionCabeceraModel = mongoose.model<IPlanillaEvaluacionCabecera>(
    'PlanillaEvaluacionCabecera',
    PlanillaEvaluacionCabeceraSchema,
    'planilla_evaluacion_cabecera'
);

export { PlanillaEvaluacionCabeceraSchema };
