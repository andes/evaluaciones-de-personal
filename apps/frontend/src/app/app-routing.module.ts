import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppHomeComponent } from './home/home.component';
import { edItemsComponent } from './editems/edItems.component';
import { edCategoriaComponents } from './edcategorias/edcategoria.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: AppHomeComponent,
        canActivate: [],
        pathMatch: 'full'
    },
    {
        path: 'edItems',
        component: edItemsComponent,
        canActivate: [],
        pathMatch: 'full'
    },
    {
        path: 'edCategoriass',
        component: edCategoriaComponents,
        canActivate: [],
        pathMatch: 'full'
    },


];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
