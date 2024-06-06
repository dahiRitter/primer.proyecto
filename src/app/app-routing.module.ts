import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './modules/productos/pages/productos/productos.component';
import { AlimentacionComponent } from './modules/productos/pages/alimentacion/alimentacion.component';
import { JugetesComponent } from './modules/productos/pages/jugetes/jugetes.component';
import { IndumentariaComponent } from './modules/productos/pages/indumentaria/indumentaria.component';

//son las encargadas de tener las rutas de la pagina
const routes: Routes = [
{
  //ruta comun-> 1 solo componente
  path:"producto",component:ProductosComponent
},
{
  path:"alimentacion",component:AlimentacionComponent
},
{
  path:"jugetes",component:JugetesComponent
},
{
  path:"indumentaria",component:IndumentariaComponent
},


//carga peresoza -> 1 solo componente
//loadChildren: indica una ruta hija
//()=>inport: ruta de donde viene el modulo
//.then: promesa/ funcion sinconica

{
path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
},
{
  path:"",loadChildren:()=>import('./modules/productos/productos.module').then(m=>m.ProductosModule)
}
];
=======

const routes: Routes = [];
>>>>>>> 42136bb3ac16fe0c1fc802391cc73927ae8e87c5

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
