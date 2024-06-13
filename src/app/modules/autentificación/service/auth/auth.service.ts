import { Injectable } from '@angular/core';

//servicio de autentificacion de firabase
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

//referencia auth de firabase para inicializar
  constructor(public auth: AngularFireAuth) { }

  

//funcion para registro
  registrar(email: string, pasword: string){
    //retorna nueva informacion de email y contraseña
    return this.auth.createUserWithEmailAndPassword(email, pasword);
  }
  //fincion para inicio de secion
  IniciarSecion(email:string, pasword: string){
    //validar el email y la contraseña
    return this.auth.signInWithEmailAndPassword(email, pasword);
  }
  //funcion para crear secion
  cerrarSecion(){
    //devolver una promesa vacia
    return this.auth.signOut();
  }
}
