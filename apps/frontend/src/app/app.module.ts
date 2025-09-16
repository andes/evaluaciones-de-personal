import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Server } from '@andes/shared';
import { AppRouting } from './app.routing';
import { AppHomeComponent } from './home/home.component';
import { AcercaDeComponent } from './home/acercade';

import { NgxObserveModule } from 'ngx-observe';
import { PlexModule, Plex } from '@andes/plex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AyudaComponent } from './home/ayuda.component';
import { CategoryService } from './services/categoria.service';
import { MenuComunesComponent } from './home/menucomunes.component';
import { MenuPlanillaEDComponent } from './home/MenuPlanillaED.component';
import { fondocomponent } from './shared/menu/fondo.component';
//componente categorias
import { ListarCategoriaComponent } from './componentes/listar-categorias/listar-categorias.component';
import { CrearCategoriasComponent } from './componentes/crear-categorias/crear-categorias.component';
import { EditCategoriasComponent } from './componentes/editar-categorias/edit-categoria.component';
//componentes items
import { ListarItemsComponent } from './Items/listar-items/listar-items.component';
import { ItemsRComponent } from './Items/itemsR.component';
import { CrearItemsComponent } from './Items/crear-items/crear-items.component';
import { EditItemsComponent } from './Items/editar-items/edit-items.component';
import { TipoEvaluacionComponent } from './componentes/TipoEvaluacion.component';

//componentes PlanillaED
import { ListarPlanillaEDComponent } from './PlanillaED/listar-PlanillaED/listar-PlanillaED.component';
import { CrearPlanillaEDComponent } from './PlanillaED/crear-PlanillaED/crear-PlanillaED.component';
import { CrearPlanillaEDItemsComponent } from './PlanillaED/crear-PlanillaEDItems/crear-PlanillaEDItems.component';
import { CrearPlanillaEDItemsDetalleComponent } from './PlanillaED/crear-PlanillaEDItemsDetalle/crear-PlanillaEDItemsDetalle.component';
// plantilla
import { sharedMenuComunesComponent } from './shared/menu/menuComunes/sharedmenuComunes.component';
import { LoginComponent } from './users/login/login.component'
import { RegisterComponent } from './users/register/register.component';
import { HeaderComponent } from './shared/header.component';
import { ComunesComponent } from './shared/menu/comunes.component';
import { PlanillaComponent } from './shared/menu/menuPlanillas/Planillas.component';
//evaluacion
import { EvaluacionCabeceraComponent } from './Evalluacion/evaluacionCabecera.component';
import { EvaluacionAgenteComponent } from './Evalluacion/evaluacionAgente.component';
import { EvaluacionItemsComponent } from './Evalluacion/evaluacionItems.component';
import { AgentesComponent } from './componentes/agentes.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        PlexModule,
        NgxObserveModule,
        ReactiveFormsModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        MenuComunesComponent,
        AppHomeComponent,
        AyudaComponent,
        ListarCategoriaComponent,
        CrearCategoriasComponent,
        EditCategoriasComponent,
        ListarItemsComponent,
        CrearItemsComponent,
        EditItemsComponent,
        ListarPlanillaEDComponent,
        MenuPlanillaEDComponent,
        CrearPlanillaEDComponent,
        CrearPlanillaEDItemsComponent,
        CrearPlanillaEDItemsDetalleComponent,
        sharedMenuComunesComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        ComunesComponent,
        PlanillaComponent,
        EvaluacionCabeceraComponent,
        EvaluacionAgenteComponent,
        EvaluacionItemsComponent,
        TipoEvaluacionComponent,
        ItemsRComponent,
        AgentesComponent,
        fondocomponent,
        AcercaDeComponent





    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRouting,
        RouterModule,
        NgxObserveModule,
        PlexModule,
        ReactiveFormsModule,
    ],
    providers: [Plex, Server, CategoryService],
    bootstrap: [AppComponent]
})
export class AppModule { }
