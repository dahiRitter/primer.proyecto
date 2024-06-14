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
  //funcion para tomar UID
  async obtenerUid(){
  //esto nos va a generar una promesa, y la constante la va a capturtarar
  const user =await this.auth.currentUser;

  /*
  si el usuario no respeta la estructura de la interfaz
  si tuvo problemas */

  if (user == null) {
    return  null;
     }else{
      return user.uid;
     }
  }
}
