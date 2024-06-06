import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AutentificaciónRoutingModule } from './autentificación-routing.module';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistroComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule,
    AutentificaciónRoutingModule
  ],
  exports: [
    RegistroComponent,
    InicioSesionComponent
  ]
})
export class AutentificaciónModule { }
