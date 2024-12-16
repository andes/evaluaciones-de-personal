//import EdItemsRouter from './app/eDesempeno/routes/configEvaDesemp';
import EdItemsRouter from './app/eDesempeno/routes/configEvaDesemp';
import EdCategoriaItems from './app/categoriaitems/routes/categoriaItems';
import ItemsRouter from './app/Items/routes/items';
import EfectorRouter from './app/Efectores/Routes/efectores';
import ServiciosRouter from './app/Servicios/Routes/Servicios';
import PlanillaEDRouter from './app/PlanillaED/Router/PlanillaED';


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
application.add({ path: '/api', router: ItemsRouter })
application.add({ path: '/api', router: EfectorRouter })
application.add({ path: '/api', router: ServiciosRouter })
application.add({ path: '/api', router: PlanillaEDRouter })

application.add({ path: '/api', router: EdCategoriaItems })

application.add({ path: '/api', router: AuthRouter });
application.router()
application.start();