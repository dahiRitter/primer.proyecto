import { Component } from '@angular/core';
import { Producto } from 'src/app/moduls/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  //crear una coleccion de productos del tipo producto -> lo definimos como un array
  coleccionProductos: Producto[] = [];

  //variable va a tomar el producto
  productoSeleccionado!: Producto;

  nombreImagen!: string; // obtener nombre de la imagen
  imagen!: string;

  //visible para manejar el estado de edicion y eliminacion del producto
  modalVisibleProducto: boolean = false;




  //definimos formulario para los productos
  /**
   * atributos alfanumericos (string) se inicializan con comillas simles
   * atributos numericos (number) se inicializan con zero 0
   */

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    //imagen:new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    //suscribe -> notifica constantemente los cambios actuales del sistema.
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto() {
    //validamos los valores del producto agregado
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        //idProducto no se toma porque es generado por la BD y no por el usuario
        idProducto: '',
        //el rest es tomado como informacion ingresada por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        //imagen ahora toma la URL generada desde storage
        imagen: '',
        alt: this.producto.value.alt!

      }
      //enviamos nombre y url de la imagen; 
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          //encapsulamos
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              //ahora metodo crearProducto recibe los datos de formulario
              this.servicioCrud.crearProductos(nuevoProducto, url)
                .then(producto => {
                  alert("ha agregado un nuevo producto con exito");
                  //limpiamos forfulario para agregar nuevos productos
                  this.producto.reset();
                })

                .catch(error => {
                  alert("Hubo un problema al agregar un nuevo producto");
                  this.producto.reset();
                });
            })
        })





    }
  }

  //funcion para alertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto) {
    //abre el modal
    this.modalVisibleProducto = true;

    //toma los valores del producto elegido
    this.productoSeleccionado = productoSeleccionado;

  }
  //funcion para eliminar definitinitivamente al producto
  borrarProducto() {
    //envia ID del producto eliminado y la ubicacion en el almacenamiento de STORAGE
    this.servicioCrud.eliminarProductos(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        alert("el producto se ha eliminado corrctamente")
      })
      .catch(error => {
        alert("no se ha podido eliminar el producto \n" + error);
      })
  }
  borrarEditar() {

  }
  //funcion
  mostrarProducto(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;

    //enviar o "setear"
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      //imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })

  }

  editarProducto() {
    let datos: Producto = {
      //solo el id toma y deja igual su valor
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      descripcion: this.producto.value.descripcion!,
      precio: this.producto.value.precio!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen!,
      alt: this.producto.value.alt!

    }

    //verificamos que el usuario ingrese una nueva imagen o no
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {

              //actualizamos url de la imagen en los datos del formulario
              datos.imagen = url;

              //Aactualizamos los datos dende el formulario de edicion
              this.actualizarProducto(datos);

              //vaciamos casillas del formulario
              this.producto.reset();
            })
            .catch(error => {
              alert("hubo un problema al subir la imagen \n" + error);
              this.producto.reset();

            })
        })
    } else {
      /**
       * actualizamos formulario con los datos re
       */
      this.actualizarProducto(datos);
    }



  }
  //ACTUALIZA  la info ya existente de los productos
  actualizarProducto(datos: Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("el producto fue mdificado con exito.");
        this.producto.reset();
      })
      .catch(error => {
        alert("hubo un problema al modificar el poducto.");
      })
  }

  //Metodo para cargar imagenes
  cargarImagen(event: any) {
    let archivo = event.target.files[0];
    //variable para crear un nuevo objeto de tipo "archivo" o "file" y poder leerlo
    let reader = new FileReader();
    if (archivo != undefined) {
      /*
      llamamos al metodo readAsDataUrl para leer toda la info recibida
      enviamos como parametro el archivo porque sera xq sera el encargado de tener la info
      ingresada por el usuario
      */
      reader.readAsDataURL(archivo);
      //definimos que haremos con la funcion mediante funcion fecha
      reader.onloadend = () => {
        let url = reader.result;

        //verificamos que la "url" sea existente y diferente a "nula"
        if (url != null) {

          //definimos nimbre de la imagen con atributo "name" del imput
          this.nombreImagen = archivo.name;

          //definimos ruta de la imagen segun el  URL recibida en formato cadena (string)
          this.imagen = url.toString();
        }
      }

    }
  }

}
