import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true;

  /* ####################################### LOCAL
  // Definimos la propiedad local para que guarde la colección

  // COLECCIÓN LOCAL DE usuarioIngresado CON INFORMACIÓN
  public coleccionusuarioIngresadoLocal: Usuario[];
  
  constructor(){
    this.coleccionusuarioIngresadoLocal = [
      {
        uid: '',
        nombre: 'Leandro',
        apellido: 'Soto',
        email: 'leandrosoto@gmail.com',
        rol: 'admin',
        password: '123456'
      },
      {
        uid: '',
        nombre: 'Pepe',
        apellido: 'Novita',
        email: 'pepenovita@gmail.com',
        rol: 'vis',
        password: 'abc123'
      },
      {
        uid: '',
        nombre: 'Tomas',
        apellido: 'Loyola',
        email: 'tomasloyola@gmail.com',
        rol: 'admin',
        password: 'abcdef'
      }
    ]
  }*/
  // ####################################### FIN LOCAL

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  // ####################################### INGRESADO
  // Importamos la interfaz de usuario e inicializamos vacío
  usuarioIngresado: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función para el inicio de sesión
  async iniciarSesion() {
    // ############################################# LOCAL
    // Las credenciales reciben la información que se envía desde la web
    /*
    const credenciales = {
      uid: this.usuarioIngresado.uid,
      nombre: this.usuarioIngresado.nombre,
      apellido: this.usuarioIngresado.apellido,
      email: this.usuarioIngresado.email,
      rol: this.usuarioIngresado.rol,
      password: this.usuarioIngresado.password
    }

    // Repetitiva para recorrer la colección local
    for(let i = 0; i < this.coleccionusuarioIngresadoLocal.length; i++){
      // Constante que guarde la información de la posición actual de los objetos
      const usuarioLocal = this.coleccionusuarioIngresadoLocal[i];

      
      Comparando uno por uno los atributos del objeto local con el que ingresa el 
      usuario 
      if(usuarioLocal.nombre === credenciales.nombre && 
        usuarioLocal.apellido === credenciales.apellido && 
        usuarioLocal.email === credenciales.email && 
        usuarioLocal.rol === credenciales.rol && 
        usuarioLocal.password === credenciales.password
      ){
        // Notificamos al usuario su correcto ingreso
        alert("Iniciaste sesión correctamente :)");
        // Paramos la función
        break;
      } else {
        alert("No se pudo iniciar sesión :(");
        break;
      }
    }*/

    // ############################################# FIN LOCAL

    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    try{
      const usuarioBD =await this.servicioAuth.obtenerUsuario(credenciales.email);
      //! -> si es diferente
      //.empty-> metodo
      if(!usuarioBD || usuarioBD.empty){
        alert('el correo electronico no esta registrado.');
        this.limpiarInputs();
        return;
      }
      /**
       * primer documento (registro) en la coleccion de usuarios que se obt6iene desde la consulta.
       */
      const usuarioDoc = usuarioBD.docs[0];

      /**
       * extrae los datos del documento en formas de objeto y especifica como un tipo
       * 'usuario'-> haciendo eferencia a nuestra interfas de usuario
       */

      const usuarioData = usuarioDoc.data() as Usuario;

      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      if(hashedPassword !== usuarioData.password){
        alert("contraseña incorrecta");
        this.usuarioIngresado.password = '';
        return;
      }

    } catch(error){
      this.limpiarInputs();
    }


    const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        alert('¡Se ha logueado con éxito! :D');

        this.servicioRutas.navigate(['/inicio']);
      })
      .catch(err => {
        alert('Hubo un problema al iniciar sesión :( ' + err);

        this.limpiarInputs();
      })
  }

  // Función para vaciar el formulario
  limpiarInputs() {
    const inputs = {
      email: this.usuarioIngresado.email = '',
      password: this.usuarioIngresado.password = ''
    }
  }
}
