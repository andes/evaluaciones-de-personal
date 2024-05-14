import { Component, OnInit } from '@angular/core';
import { Plex } from '@andes/plex';
import { LocationService } from '../../../shared/location.services';
import { InstitutionService } from '../../service/institution.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { cache } from '@andes/shared';

@Component({
    selector: 'institutionListComponent',
    templateUrl: './institution-list.component.html'
})
export class AppInstitutionListComponent implements OnInit {
    public institutions$: Observable<any[]>;
    public institutions = [];
    public institucion = null;
    public nombre = null;

    public activateInstitution = false;
    constructor(
        public plex: Plex,
        private institutionService: InstitutionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.institutions$ = this.institutionService.search().pipe(cache());

    }


    onClose() {
        this.activateInstitution = false;
        this.institucion = null;
    }

    onSave() {

    }


    mainMenu() {
        this.router.navigate(['/']);
    }

    filtrarResultados() {
        this.institutions$.subscribe(value => {
            this.institutions = value;
            if (this.nombre) {
                this.institutions = this.institutions.filter(e => e.nombre.toLowerCase().search(this.nombre.toLowerCase()) != -1);
            }
        });
    }
}
