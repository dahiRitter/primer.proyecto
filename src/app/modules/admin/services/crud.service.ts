import { Injectable } from '@angular/core';
import { Producto } from 'src/app/moduls/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los productos de la web del tipo producto
  private productosCollection: AngularFirestoreCollection<Producto>

  constructor(private database: AngularFirestore){
    //referenciamos coleccion productos y sera subida como "producto" a firebase
    this.productosCollection = database.collection('producto');
  }
  
  //CREAR productos
  crearProductos(producto: Producto){
    return new Promise(async (resolve, reject) => {
      try{
        //creamos numero identificaivo para el priducto en la base de datos
        const idProducto = this.database.createId();

        //asignamos id creado  al atributo idproducto de la interfaz "producto"
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      }catch(error){
        reject(error);
      }
    })
  }


  //OBTENER productos
  obtenerProductos(){
    //anapchotchange -> tma una captura de los datos
    //pipe -> funciona como tuberia que retorna e nuevo arreglo de datos.
    //map -> "mapea" o recorre una nueva informacion
    //a -> resguarda la nueva informacion y ala resguarda.
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a =>a.payload.doc.data())));
  }
  //EDITAR productos
  //ELIMINAR productos
  
}
