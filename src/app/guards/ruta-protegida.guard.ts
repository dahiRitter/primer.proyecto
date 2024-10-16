import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';
//OPERADORES DE TIPO OBSERVABLES
import { map, switchMap, of, from } from 'rxjs'

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  //injectamos/ instanciamos servicios de autentificacion
  const servicioAuth = inject(AuthService);

  //injectamos/ instanciamos servicio de rutas
  const servicioRutas = inject(Router);

  //especificamos el rol esperado en el guardian
  const rolEsperado = "admin";


  return true;
};
