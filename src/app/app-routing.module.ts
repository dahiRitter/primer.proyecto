import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

//son las encargadas de tener las rutas de la pagina
const routes: Routes = [
{
  //ruta comun-> 1 solo componente
  path:"",component:InicioComponent
},
//carga peresoza -> 1 solo componente
//loadChildren: indica una ruta hija
//()=>inport: ruta de donde viene el modulo
//.then: promesa/ funcion sinconica

{
path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
