import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  // Este "hide" es para el input de contraseña
  hide = true;

  // IMPORTACIÓN DEL MODELO / INTERFAZ
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // CREAR UNA COLECCIÓN QUE SOLO RECIBE OBJETOS DEL TIPO USUARIOS
  coleccionUsuarios: Usuario[] = [];

  constructor(
    public servicioAuth: AuthService,
    public servicioRuta: Router
  ){}

  // FUNCIÓN PARA EL REGISTRO
  async registrar(){
   //CREDENCIALES = información que ingrese el usuario
    //  const credenciales = {
    //   uid: this.usuarios.uid,
    //   nombre: this.usuarios.nombre,
    //   apellido: this.usuarios.apellido,
    //   email: this.usuarios.email,
    //   rol: this.usuarios.rol,
    //   password: this.usuarios.password
    // }
    const credenciales={
      email: this.usuarios.email,
      pasword: this.usuarios.password
    }
    const res= await this.servicioAuth.registrar(credenciales.email,credenciales.pasword)
    //el metodo then nos devuelve la respuesta
    .then(res =>{
      alert("agregado un usuario con exito:)");

      //accedemos al servicio de rutas ->metodo navigate
      //metodo navigate-> permite dirigir
      this.servicioRuta.navigate(['/inicio'])
    })
    //el metodo catch toma una falla y la vuelve un error
    .catch(error=>{
      alert("hubo un problema al registrar un nuevo usuario: (')");
    })

    // enviamos los nuevos registros por medio del método push a la colección
    //this.coleccionUsuarios.push(credenciales);

    // Notificamos al usuario el correcto registro
    //alert("Te registraste con éxito :)";

    // Llamamos a la función limpiarInputs() para que se ejecute
    this.limpiarInputs();

    // por consola
    // console.log(credenciales);
    // console.log(this.coleccionUsuarios)
  }

  // Función para vaciar el formulario
  limpiarInputs(){
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}


