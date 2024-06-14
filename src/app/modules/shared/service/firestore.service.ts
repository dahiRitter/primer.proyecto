import { Injectable } from '@angular/core';

//importamos frirest
import{AngularFirestore, AngularFirestoreCollection}from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  /*definimos una coleccion de usuarios privada
  *va a hacer una coleccion de firestore
  *respetara la estructura de datos de la interfaz de usuario */
  private usuarioCollection: AngularFirestoreCollection<Usuario>
  

  constructor(private database: AngularFirestore) {
    this.usuarioCollection= this.database.collection<Usuario>('usuarios');
   }

   agregarUsuario(usuario:Usuario, id: string){
    return new Promise(async(resolve, reject)=>{
      try{
        usuario.uid =id;
        /**
         * const resultado=coleccion de usuario, envia como documento el uid
         * y setea la informacion que ingresamos al registro
         */

        const resultado = await this.usuarioCollection.doc(id).set(usuario);
        resolve(resultado)
        //bloque catch encapsula una falla y la vuelve un error
      }catch(error){}
    })
   }
}
