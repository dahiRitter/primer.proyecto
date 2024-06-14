import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../service/auth/auth.service';
import { FirestoreService} from 'src/app/modules/shared/service/firestore.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
hide =true;

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}

  InicioSesion(){

    const credenciales={
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    const  res = await this.servicioAuth.IniciarSecion(credenciales.email,credenciales,password)
    .then(res => {
      alert('se a logueado con exito');

      this.servicioRutas.navigate(['/inicio']);
    })
    .catch(err =>{
      alert('hubo un problema al iniciar cesion:('+err')');
      this.limpiarImputs();
    })
  }
}

