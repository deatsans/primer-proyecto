import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/service/auth.service';
import { Router } from '@angular/router';
import {map, switchMap, of, from} from 'rxjs'


export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  //inyectamos/ instanciamos servicon de autentificaicon
  const servicioAuth = inject(AuthService)
  //inyectamos/ instancia servicio de rutas
  const servicioRutas = inject(Router)
// espesificamos el rol esperado en el guardian
  const rolEsperado = "admin"

  return from(servicioAuth.obtenerUid()).pipe(
    switchMap(uid =>{
      if(uid){
        return servicioAuth.obtenerRol(uid).pipe(
          map(rol =>{
            if(rol === rolEsperado){
              //si coincide el rol esperado, habilita acceso al usuario
              console.log("Usuario verificado como administrador")

              return true
            }else{
              //caso contrario, deniega acceso
              return false
            }
          })
        )
      }else{
        //ej.:no esta registrado o es tipo "vicitante "
        console.log("Usuario no validado. permisos insuficinetes.")
        //redirecsionamos a inicio para usuarios no validos o sin permiso 
        return of(servicioRutas.createUrlTree(["/inicio"]))
      }
    })
  )
};
