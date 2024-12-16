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
import { CrearPlanillaEDItemsComponent } from './PlanillaED/crear-PlanillaEDItems/crear-PlanillaEDItems.component.'

const appRoutes: Routes = [

    {
        path: 'menuparametros',
        component: MenuComunesComponent,
        canActivate: [],
        pathMatch: 'full'
    },

    {
        path: 'menuPlanillaED',
        component: MenuPlanillaEDComponent,
        canActivate: [],
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
        canActivate: [],
        pathMatch: 'full'
    },
    {
        path: 'CrearCategoriasComponetpath',
        component: CrearCategoriasComponent,
        canActivate: [],
        pathMatch: 'full'
    },
    {
        path: 'editar-categoria/:id',
        component: EditCategoriasComponent,
        canActivate: [],
        pathMatch: 'full'
    },

    {
        path: 'ListarItems',
        component: ListarItemsComponent,
        canActivate: [],
        pathMatch: 'full'
    },
    {
        path: 'CrearItemsComponetpath',
        component: CrearItemsComponent,
        canActivate: [],
        pathMatch: 'full'
    },

    {
        path: 'editar-items/:id',
        component: EditItemsComponent,
        canActivate: [],
        pathMatch: 'full'
    },

    {
        path: 'listar-planillaEDRouter',
        component: ListarPlanillaEDComponent,
        canActivate: [],
        pathMatch: 'full'
    },

    {
        path: 'crear-planillaEDRouter',
        component: CrearPlanillaEDComponent,
        canActivate: [],
        pathMatch: 'full'
    },

    {
        path: 'crear-planillaEDItems',
        component: CrearPlanillaEDItemsComponent,
        canActivate: [],
        pathMatch: 'full'
    },



];

export const AppRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
