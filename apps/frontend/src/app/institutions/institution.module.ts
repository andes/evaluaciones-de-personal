import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlexModule } from '@andes/plex';

import { AppInstitutionListComponent } from './components/institutions-list/institution-list.component';

import { InstitutionRouting } from './institution.routing';

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, PlexModule, InstitutionRouting],
    declarations: [AppInstitutionListComponent],
    providers: []
})
export class InstitutionModule { }
