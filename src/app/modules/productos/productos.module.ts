import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { JugetesComponent } from './pages/jugetes/jugetes.component';
import { AdoptarComponent } from './pages/adoptar/adoptar.component';


@NgModule({
  declarations: [
    ProductosComponent,
    AlimentacionComponent,
    IndumentariaComponent,
    JugetesComponent,
    AdoptarComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
