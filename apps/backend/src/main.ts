import EdItemsRouter from './app/eDesempeno/routes/configEvaDesemp';
import EdCategoriaItems from './app/categoriaitems/routes/categoriaItems';
import ItemsRouter from './app/Items/routes/items';
import EfectorRouter from './app/Efectores/Routes/efectores';
import ServiciosRouter from './app/Servicios/Routes/Servicios';
import PlanillaEDRouter from './app/PlanillaED/Router/PlanillaED';
import AuthRouter from './app/auth/auth.routes';
import { UsersRouter } from './app/users/user.controller';
import agenterouter from './app/agentes/agentes.router';

require('dotenv').config();
console.log('🔍 JWT_SECRET leído desde .env:', process.env.JWT_SECRET);

const { Connections } = require('./app/connection');
const { application } = require('./app/application');
Connections.initialize();

// Rutas
application.add({ path: '/api', router: UsersRouter });
application.add({ path: '/api', router: EdItemsRouter })
application.add({ path: '/api', router: ItemsRouter })
application.add({ path: '/api', router: EfectorRouter })
application.add({ path: '/api', router: ServiciosRouter })
application.add({ path: '/api', router: PlanillaEDRouter })
application.add({ path: '/api', router: EdCategoriaItems })
application.add({ path: '/api', router: agenterouter })

// ruta para la autenticación (login)
application.add({ path: '/api', router: AuthRouter });
application.add({ path: '/api/auth', router: AuthRouter });

application.router()
application.start();