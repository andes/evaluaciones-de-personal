import { Component, OnInit } from '@angular/core';
import { PlanillaEDService } from "../../services/PlanillaED.Service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-listar-PlanillaED',
    templateUrl: './listar-PlanillaED.component.html',
    styleUrls: ['./listar-PlanillaED.component.css']

})
export class ListarPlanillaEDComponent implements OnInit {
    public listPlanillaED: PlanillaEDService[] = [];
    public filterPlanillaED: PlanillaEDService[] = []; // Array para los ítems filtrados
    public searchTerm: string = ''; // Término de búsqueda

    ///// hacer en service PlanillaEDservice .--
    constructor(private _PlanillaEDService: PlanillaEDService, private router: Router) { }

    ngOnInit(): void {
        this.obtenerPlanillaED();
    }

    obtenerPlanillaED() {
        this._PlanillaEDService.getPlanillasED().subscribe(
            (data: PlanillaEDService[]) => {
                this.listPlanillaED = data;
                this.filterPlanillaED = data; // Inicializa filteredItems con todos los ítems
            },
            (error) => {
                // Manejo de errores
            }
        );
    }

    /*
         Método para filtrar ítems
        filtrarPlanillaED() {
            if (!this.searchTerm) {
                this.filterPlanillaED = this.listPlanillaED; // Si no hay término de búsqueda, mostrar todos los ítems
                return;
            }
    
            this.filterPlanillaED = this.listPlanillaED.filter(item =>
                item.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    
    */
    crearNuevoPlanillaEDM() {
        this.router.navigate(['crear-planillaEDRouter']);
    }

    public onPlanillaEDClick(): void {
        this.router.navigate(['/listar-planillaEDRouter']);
    }
    /*
        editarPlanillaED(planillaed: PlanillaED) {
            this.router.navigate(['editar-planillaED', planillaed._id]);
        }
        */
}
