import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Server } from '@andes/shared';
import { AppRouting } from './app-routing.module';
import { AppHomeComponent } from './home/home.component';

import { NgxObserveModule } from 'ngx-observe';
import { PlexModule, Plex } from '@andes/plex';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AyudaComponent } from './home/ayuda.component';

@NgModule({
    declarations: [AppComponent, AppHomeComponent, AyudaComponent],
    imports: [
        BrowserModule,
        PlexModule,
        FormsModule,
        HttpClientModule,
        AppRouting,
        NgxObserveModule
    ],
    providers: [Plex, Server],
    bootstrap: [AppComponent]
})
export class AppModule { }
