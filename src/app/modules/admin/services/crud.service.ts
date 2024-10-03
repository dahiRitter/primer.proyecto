import { Injectable } from '@angular/core';
import { Producto } from 'src/app/moduls/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

//importaciones para el manejo de archivos y referencias de estorage

//import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

/*
  getDownloadURL: --> para obtener la URL de descarga de una imagen subida
  getStorage:--> pa obtener la instacia de almacenamiento
  ref:--> para crear referencia u ubicacion en el almacenamiento
  UploadResult: --> tipo que representa el resultado de una operacion subia
  uploadString: --> para subir imagenes en foemato de cadena (string)
  deleteObject:--> para eliminar un espacio en el almacenamiento
*/

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los productos de la web del tipo producto
  /*private productosCollection: AngularFirestoreCollection<Producto>

  //definimos variable "respuesta" que podra subir resultados
  private respuesta!: UploadResult;
  //Inicializamos servicio storage
  private storage = getStorage();*/        //ESTO!

  constructor(private database: AngularFirestore) {
    //referenciamos coleccion productos y sera subida como "producto" a firebase
    this.productosCollection = database.collection('producto');
  }

  //CREAR productos --> obtiene datos del formulario y sera subida como "producto" a firebase
  //crearProductos(producto: Producto, url: string) { ESTO!!
    return new Promise(async (resolve, reject) => {
      try {
        //creamos numero identificaivo para el priducto en la base de datos
        const idProducto = this.database.createId();

        //asignamos id creado  al atributo idproducto de la interfaz "producto"
        producto.idProducto = idProducto;

        //asignamos URL recibida del parametro al atributo imagen de la interfaz producto
        //producto.imagen = url;      ESTO!!

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }


  //OBTENER productos
  obtenerProductos() {
    //anapchotchange -> tma una captura de los datos
    //pipe -> funciona como tuberia que retorna e nuevo arreglo de datos.
    //map -> "mapea" o recorre una nueva informacion
    //a -> resguarda la nueva informacion y ala resguarda.
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }

  //EDITAR productos
  modificarProducto(idProducto: string, nuevaData: Producto) {
    //accedemos a la coleccion, buscamos por ID y actualizamos informacion.
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }

  //ELIMINAR productos
  /*eliminarProductos(idproducto: string, imagenURL: string) {

    return new Promise((resolve, rejet) => {
      try {
        //definimos referenvia local de storage en el bloque try
        const storage = getStorage();

        //definimos referencia local desde el almacenamiento de storage
        const referenciaImagen = ref(storage, imagenURL);

        //eliminamos la imagen desde el almacenamiento
        deleteObject(referenciaImagen)
          .then((res) => {
            //accedo a la coleccion, busc su ID y lo elimino.
            const respuesta = this.productosCollection.doc(idproducto).delete();
            resolve(respuesta);
          })
          .catch(error => {
            rejet("error al eliminar la imagen: \n" + error);
          });*/                                            //ESTO!


      }
      catch (error) {
        rejet(error);

      }
    })
  }
  //OBTENER URL DE LAS IMAGENES
  /*obtenerUrlImagen(respuesta: UploadResult) {
    //retorna url obtenida como REFERENCIA
    return getDownloadURL(respuesta.ref);
  }
  /**
   * PARAMETROS DEFINIDOS
   * @param {string} nombre --> nombre de la imagen
   * @param {any} imagen --> tipo de imagenes que se pueden subir (extenciones)
   * @param {string} ruta --> ruta de almacenamiento de las imagenes
   * @returns --> se retorna lo obtenido
   */

  //SUBIR imagenes con sus referencias
  /*async subirImagen(nombre: string, imagen: any, ruta: string) {
    try {
      //crear una referencia de la imagen
      //accedea a storage (almacenamiento), ruta (carpeta), nombre(nombreImagen).
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);
      //asignamos a la respuesta informacion de la imagen subida
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
        .then(resp => {
          return resp;
        })
      return this.respuesta;

    }
    catch(error){
      console.log("Error: \n" +error);

      return this.respuesta;
    }

  }

}
