import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppInstitutionListComponent } from './components/institutions-list/institution-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: AppInstitutionListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: []
})
export class InstitutionRouting { }
