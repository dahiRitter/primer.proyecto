import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logueado = true; 
  deslogueado = false;

  

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ){}

  iniciar (){
    this.logueado = false;
    this.deslogueado = true;
  }

  cerrarSesion (){
    this.deslogueado = false;
    //va a eliminar el "token"actual del usuario
    //token: estado actual del usuario en el navegador para matener la sesion abierta
    this.servicioAuth.cerrarSesion(); 

    this.servicioRutas.navigate(["/"]); //redirigimos a la raiz de la pagigina
    this.logueado = true;
}

}
