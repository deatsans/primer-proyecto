import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado = true
  deslogiado = false

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router    
  ){}

  iniciar(){
    this.logueado= false
    this.deslogiado= true
  
  }

  cerrarSesion(){
    this.deslogiado= false
    this.servicioAuth.cerrarSesion()

    this.servicioRutas.navigate(['/'])
    this.logueado = true
  }
}
