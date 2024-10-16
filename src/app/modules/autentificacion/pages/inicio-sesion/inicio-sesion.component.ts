import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/modules/autentificacion/service/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true;
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  coleccionUsuarios: Usuario[] = [];

  Inicio(){
    const credenciales ={
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      rol: this.usuarios.rol,
      email: this.usuarios.email,
      password: this.usuarios.password
    }
  }

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}
  limpiarImpus(){
    const input={
      email: this.usuarios.email='',
      password: this.usuarios.password=''
    }
  }
  async iniciarSesion(){
    const credenciales={
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try{
      const usuariosBD = await this.servicioAuth.obtenerUsuario(credenciales.email)

      //
      //.empty si esta vacio
      if(!usuariosBD|| usuariosBD.empty){
        Swal.fire({
          title: "oh no que hiciste boludo! ",
          text: "hubo un problema en el email :(",
          icon: "error"
        });
        
       
        this.limpiarImpus()
        return
      }

      const usuarioDoc = usuariosBD.docs[0]

      const usuarioData = usuarioDoc.data() as Usuario

      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString()

      if(hashedPassword !== usuarioData.password){
        Swal.fire({
          title: "oh no que hiciste boludo! ",
          text: "hubo un problema en la contraseña :(",
          icon: "error"
        });
        
        this.usuarios.password = ""
        return
      }

      const res = await this.servicioAuth.iniciarSesion(credenciales.email,credenciales.password)
      .then(res =>{
        Swal.fire({
          title: "buen tranajo no rompiste nada ",
          text: "Se puedo iniciate sesion con exito!",
          icon: "success"
        });

        //almacemamos el rol del usuarios en el serviso de autentificacion
        this.servicioAuth.enviaRolUsuario(usuarioData.rol)
         if(usuarioData.rol === "admin"){
          console.log("inicio de sesion de usuario aministraodr")
          this.servicioRutas.navigate(['/admin'])
         }else{
          console.log("inicio de sesion de usuario vivitante")
          this.servicioRutas.navigate(['/inicio'])
         }
  
        
  
      })
      .catch(err =>{
        
        Swal.fire({
          text: "hubo un problema al iniciar sesion :("+err,
          icon: "error"
        });
        
  
        this.limpiarImpus()
      })

    }catch(error){
      this.limpiarImpus()
    } 
  }
 
}
