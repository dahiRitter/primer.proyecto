import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
