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

  cambiarFondo() {
    let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement;
  
    if (toggle) {
      let checked: boolean = toggle.checked;
      document.body.classList.toggle('dark', checked);
  
      // Almacenar el estado en localStorage
      localStorage.setItem('darkMode', JSON.stringify(checked));
    }
  }
  
  // Al cargar la página, establecer el estado del toggle
  /*window.onload=()=>{
    const darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    (document.getElementById('toggle') as HTMLInputElement).checked = darkMode;
    document.body.classList.toggle('dark', darkMode);
  };*/
  

  // cambiarFondo(){
  //   let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
  //   let label_toggle:HTMLElement | null = document.getElementById('label_toggle') as HTMLElement

  //   if(toggle){
  //     let checked: boolean = toggle.checked
  //     document.body.classList.toggle('dark', checked)

  //   if(checked){
  //       label_toggle!.innerHTML = '<i class="fa-solid fa-sun"></i>'
  //     }else{
  //       label_toggle!.innerHTML = '<i class="fa-solid fa-moon"></i>'
  //     }
  //   }

  // }
}
