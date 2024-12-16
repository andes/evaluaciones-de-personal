export const environment = {
    production: false,
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    google_map_key: process.env.GOOGLE_KEY || 'unacalve',
    app_host: process.env.APP_HOST || '',
    key: process.env.JWT_KEY || null,
    mongo_host: process.env.MONGO_HOST || 'mongodb://localhost:27017/evaluaciones-de-personal',
    logDatabase: {
        log: {
            host: process.env.MONGO_LOGS || 'mongodb://localhost:27017/evalauciones-logs',
            options: {
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1500,
                useNewUrlParser: true
            }
        }
    },
    mail: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER || 'mail@mail.gob.ar',
            pass: process.env.MAIL_PASSWORD || 'somePass'
        }
    }
};

export const jobs = [

];


