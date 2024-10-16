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

  return true;
};
