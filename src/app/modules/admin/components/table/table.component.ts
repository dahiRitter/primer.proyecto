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

  //
  coleccionProductos: Producto[] = [];

  //variable va a tomar el producto
  productoSeleccionado!: Producto;
 
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
    categoria:new FormControl('', Validators.required),
    imagen:new FormControl('', Validators.required),
    alt:new FormControl('', Validators.required),
  })

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    //suscribe -> notifica constantemente los cambios actuales del sistema.
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto(){
    //validamos los valores del producto agregado
    if(this.producto.valid){
      let nuevoProducto: Producto = {
        //idProducto no se toma porque es generado por la BD y no por el usuario
        idProducto: '',
        //el rest es tomado como informacion ingresada por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!

      }

      await this.servicioCrud.crearProductos(nuevoProducto)
      .then(producto => {
        alert("ha agregado un nuevo producto con exito");
      })

      .catch(error => {
        alert("Hubo un problema al agregar un nuevo producto");
      });
      
    

    }
  }
  
  //funcion para alertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto){
    //abre el modal
    this.modalVisibleProducto = true;
     
    //toma los valores del producto elegido
    this.productoSeleccionado = productoSeleccionado;
  
  }
  //funcion para eliminar definitinitivamente al producto
  borrarProducto(){
    this.servicioCrud.eliminarProductos(this.productoSeleccionado.idProducto)
    .then(respuesta => {
      alert("el producto se ha eliminado corrctamente")
    })
    .catch(error => {
      alert("no se ha podido eliminar el producto \n"+error);
    })
  }
  borrarEditar(){

  }
  //funcion
  mostrarProducto(productoSeleccionado: Producto){
    this.productoSeleccionado = productoSeleccionado;

    //enviar o "setear"
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
 
  }

  editarProducto(){
    let datos: Producto = {
      //solo el id toma y deja igual su valor
      idProducto:this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      descripcion: this.producto.value.descripcion!,
      precio: this.producto.value.precio!,
      categoria: this.producto.value.categoria!,
      imagen: this.producto.value.imagen!,
      alt: this.producto.value.alt!
    }

    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
    .then(producto =>{
      alert("el producto fue mdificado con exito.");
    })
    .catch(error =>{
      alert("hubo un problema al modificar el poducto.");
    })

  }
}
