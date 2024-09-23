import EdItemsRouter from './app/eDesempeno/routes/configEvaDesemp';
import EdCategoriaItems from './app/categoriaitems/routes/categoriaItems'

require('dotenv').config();
const { Connections } = require('./app/connection');
const { application } = require('./app/application');
Connections.initialize();

// Constantes
const UsersRouter = require('./app/users/user.controller').UsersRouter;
const AuthRouter = require('./app/auth/auth.routes').AuthRouter;

// Rutas
application.add({ path: '/api', router: UsersRouter });
application.add({ path: '/api', router: EdItemsRouter })

application.add({ path: '/api', router: EdCategoriaItems })

application.add({ path: '/api', router: AuthRouter });
application.router()
application.start();