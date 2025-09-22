import { Component, OnInit } from '@angular/core';
import { AgentesService, modAgente } from '../services/agentes.service';  // Importa modAgente

@Component({
    selector: 'app-agentes',
    templateUrl: './agentes.component.html',
    styleUrls: ['./agentes.component.css']
})
export class AgentesComponent implements OnInit {
    filtroNombre: string = '';
    agentesOriginales: modAgente[] = [];
    agentes: modAgente[] = [];
    mostrarModal = false;
    modoEdicion = false;

    agenteSeleccionado: modAgente = {
        legajo: '',
        dni: '',
        nombre: ''
    };

    constructor(private agentesService: AgentesService) { }

    ngOnInit(): void {
        this.cargarAgentes();
    }

    cargarAgentes() {
        this.agentesService.obtenerTodosAgentes().subscribe(
            data => this.agentes = data,
            error => console.error('Error al cargar agentes', error)
        );
    }

    abrirModal() {
        this.mostrarModal = true;
        this.modoEdicion = false;
        this.agenteSeleccionado = { legajo: '', dni: '', nombre: '' };
    }

    cerrarModal() {
        this.mostrarModal = false;
    }

    editarAgente(agente: modAgente) {
        this.agenteSeleccionado = { ...agente };
        this.modoEdicion = true;
        this.mostrarModal = true;
    }

    guardarAgente() {
        if (this.modoEdicion && this.agenteSeleccionado._id) {
            this.agentesService.modificarAgente(this.agenteSeleccionado._id, this.agenteSeleccionado).subscribe({
                next: () => {
                    this.cargarAgentes();
                    this.cerrarModal();
                },
                error: (e) => console.error('Error al actualizar agente', e)
            });
        } else {
            this.agentesService.crearAgente(this.agenteSeleccionado).subscribe({
                next: () => {
                    this.cargarAgentes();
                    this.cerrarModal();
                },
                error: (e) => console.error('Error al crear agente', e)
            });
        }
    }

    eliminarAgente(id: string) {
        if (!confirm('¿Estás seguro que querés eliminar este agente?')) return;

        this.agentesService.eliminarAgente(id).subscribe({
            next: () => this.cargarAgentes(),
            error: (e) => console.error('Error al eliminar agente', e)
        });
    }
    filtrarAgentes() {
        const filtro = this.filtroNombre.toLowerCase().trim();

        if (!filtro) {
            this.agentes = [...this.agentesOriginales];
        } else {
            this.agentes = this.agentesOriginales.filter(agente =>
                agente.nombre.toLowerCase().includes(filtro)
            );
        }
    }





}
