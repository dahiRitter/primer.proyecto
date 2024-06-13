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
}
