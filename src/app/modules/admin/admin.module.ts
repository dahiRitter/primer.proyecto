import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//arvhivo  de rutas del modulo
import { AdminRoutingModule } from './admin-routing.module';
//componente de vitas
import { AdminComponent } from './pages/admin/admin.component';
//componente local
import { TableComponent } from './components/table/table.component';
//componente material
import { MatIconModule } from '@angular/material/icon';
//pauqueterias de formularios y formularios radiactivos de ANGULAR
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    AdminComponent,
    TableComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
