import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes globales
import { SharedModule } from './modules/shared/shared.module';
import { AutentificaciónModule } from './modules/autentificación/autentificación.module'; // Asegúrate de importar AutentificaciónModule

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AutentificaciónModule // Importa AutentificaciónModule
=======

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
>>>>>>> 42136bb3ac16fe0c1fc802391cc73927ae8e87c5
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
