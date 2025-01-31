import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Server } from '@andes/shared';
import { AppRouting } from './app-routing.module';
import { AppHomeComponent } from './home/home.component';

import { NgxObserveModule } from 'ngx-observe';
import { PlexModule, Plex } from '@andes/plex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AyudaComponent } from './home/ayuda.component';
import { CategoryService } from './services/categoria.service';
import { MenuComunesComponent } from './home/menucomunes.component';
import { MenuPlanillaEDComponent } from './home/MenuPlanillaED.component';
//componente categorias
import { ListarCategoriaComponent } from './componentes/listar-categorias/listar-categorias.component';
import { CrearCategoriasComponent } from './componentes/crear-categorias/crear-categorias.component';
import { EditCategoriasComponent } from './componentes/editar-categorias/edit-categoria.component';
//componentes items
import { ListarItemsComponent } from './Items/listar-items/listar-items.component';
import { CrearItemsComponent } from './Items/crear-items/crear-items.component';
import { EditItemsComponent } from './Items/editar-items/edit-items.component';
//componentes PlanillaED
import { ListarPlanillaEDComponent } from './PlanillaED/listar-PlanillaED/listar-PlanillaED.component';
import { CrearPlanillaEDComponent } from './PlanillaED/crear-PlanillaED/crear-PlanillaED.component';
import { CrearPlanillaEDItemsComponent } from './PlanillaED/crear-PlanillaEDItems/crear-PlanillaEDItems.component.';
import { CrearPlanillaEDItemsDetalleComponent } from './PlanillaED/crear-PlanillaEDItemsDetalle/crear-PlanillaEDItemsDetalle.component';



@NgModule({
    declarations: [AppComponent,
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



    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRouting,
        NgxObserveModule,
        PlexModule,
        ReactiveFormsModule,
    ],
    providers: [Plex, Server, CategoryService],
    bootstrap: [AppComponent]


})
export class AppModule { }
