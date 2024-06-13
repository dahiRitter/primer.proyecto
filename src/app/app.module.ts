import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes globales
import { SharedModule } from './modules/shared/shared.module';
import { AutentificaciónModule } from './modules/autentificación/autentificación.module'; // Asegúrate de importar AutentificaciónModule

import { environments } from 'src/environments/environments';//es para la 
import {AngularFireModule} from '@angular/fire/compat';//en para la autentificacion
import{AngularFireAuthModule} from '@angular/fire/compat/auth'; 
import{AngularFireStorageModule}from '@angular/fire/compat/storage'


//
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
    AutentificaciónModule,// Importa AutentificaciónModule

    AngularFireAuthModule,
    AngularFireModule.initializeApp(environments.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
