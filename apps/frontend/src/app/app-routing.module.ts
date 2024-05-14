import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppHomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: AppHomeComponent,
        canActivate: [],
        pathMatch: 'full'
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
