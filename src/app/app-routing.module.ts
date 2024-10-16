import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';
import { AdminModule } from './modules/admin/admin.module';

//guardian para la ruta de administrador
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard';


// Son las encargadas de tener todas las rutas de la página
const routes: Routes = [
  // Ruta común -> 1 solo componente
  {
    path: "", component: InicioComponent
  },
  // Carga perezosa -> 1 módulo
  // loadChildren: indica una ruta hija
  // ()=>import: ruta de dónde viene el módulo
  // .then: promesa/ función asincronica
  {
    path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: "", loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: "", loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m => m.AutentificacionModule)
  },
  {
    path: "", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    //especificamos que la ruta de administrador va a ser protegida por un guardian
    //y espera un rol tipo "admin"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
