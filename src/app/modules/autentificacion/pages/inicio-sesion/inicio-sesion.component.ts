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

    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    try {
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);
      //! -> si es diferente
      //.empty-> metodo
      if (!usuarioBD || usuarioBD.empty) {
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

      if (hashedPassword !== usuarioData.password) {
        alert("contraseña incorrecta");
        this.usuarioIngresado.password = '';
        return;
      }

      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          alert('¡Se ha logueado con éxito! :D');
          //almacena el rol del usuario en el servicio de autentificacion
          this.servicioAuth.enviarRolUsuario(usuarioData.rol);

          if (usuarioData.rol === "admin") {
            console.log("inicio de sesion de usuario administrador")

            this.servicioRutas.navigate(['/admin']);
          } else {
            console.log("inicio de sesion de usuario visitante")

          this.servicioRutas.navigate(['/inicio']);

          }

        })

        .catch(err => {
          alert('Hubo un problema al iniciar sesión :( ' + err);

          this.limpiarInputs();
        })

    } catch (error) {
      this.limpiarInputs();
    }



  }

  // Función para vaciar el formulario
  limpiarInputs() {
    const inputs = {
      email: this.usuarioIngresado.email = '',
      password: this.usuarioIngresado.password = ''
    }
  }
}
