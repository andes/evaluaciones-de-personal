import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppHomeComponent } from './home/home.component';
import { MenuComunesComponent } from './home/menucomunes.component';
import { MenuPlanillaEDComponent } from './home/MenuPlanillaED.component';

import { ListarCategoriaComponent } from './componentes/listar-categorias/listar-categorias.component';
import { CrearCategoriasComponent } from './componentes/crear-categorias/crear-categorias.component';
import { EditCategoriasComponent } from './componentes/editar-categorias/edit-categoria.component';

import { ListarItemsComponent } from './Items/listar-items/listar-items.component';
import { CrearItemsComponent } from './Items/crear-items/crear-items.component'
import { EditItemsComponent } from './Items/editar-items/edit-items.component';

import { ListarPlanillaEDComponent } from './PlanillaED/listar-PlanillaED/listar-PlanillaED.component';
import { CrearPlanillaEDComponent } from './PlanillaED/crear-PlanillaED/crear-PlanillaED.component';
import { CrearPlanillaEDItemsComponent } from './PlanillaED/crear-PlanillaEDItems/crear-PlanillaEDItems.component.';
import { CrearPlanillaEDItemsDetalleComponent } from './PlanillaED/crear-PlanillaEDItemsDetalle/crear-PlanillaEDItemsDetalle.component';

import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';

import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [

        {
                path: 'menuparametros',
                component: MenuComunesComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'menuPlanillaED',
                component: MenuPlanillaEDComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'home',
                component: AppHomeComponent,
                canActivate: [],
                pathMatch: 'full'
        },

        {
                path: 'menucomunes',
                component: MenuComunesComponent,
                canActivate: [],
                pathMatch: 'full'
        },


        {
                path: 'ListarCategoriasComponent',
                component: ListarCategoriaComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },
        {
                path: 'CrearCategoriasComponetpath',
                component: CrearCategoriasComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },
        {
                path: 'editar-categoria/:id',
                component: EditCategoriasComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'ListarItems',
                component: ListarItemsComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },
        {
                path: 'CrearItemsComponetpath',
                component: CrearItemsComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'editar-items/:id',
                component: EditItemsComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'listar-planillaEDRouter',
                component: ListarPlanillaEDComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'crear-planillaEDRouter',
                component: CrearPlanillaEDComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },

        {
                path: 'crear-planillaEDItems',
                component: CrearPlanillaEDItemsComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full'
        },


        {
                path: 'crear-planilla-ed-items-detalle/:id',
                component: CrearPlanillaEDItemsDetalleComponent,

                canActivate: [AuthGuard],

                pathMatch: 'full'
        },

        {
                path: 'login',
                component: LoginComponent
        },
        {
                path: 'register',
                component: RegisterComponent
        },
        {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
        }

];

export const AppRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
