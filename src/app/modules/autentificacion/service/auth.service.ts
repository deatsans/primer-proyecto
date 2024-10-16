import { Injectable } from '@angular/core';
// Servicio de AUTENTIFICACIÓN de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Referenciar Auth de Firebase para inicializarlo
  private rolUsuario: string | null = null
  constructor(
    private auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore
  ) { }

  // Función para REGISTRO
  registrar(email: string, password: string){
    // Retorna nueva información de EMAIL y CONTRASEÑA
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Función para INICIO DE SESIÓN
  iniciarSesion(email: string, password: string){
    // Validar el email y la contraseña
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Función para CERRAR SESIÓN
  cerrarSesion(){
    // Devolver una promesa vacía
    return this.auth.signOut();
  }

  // Función para tomar UID
  async obtenerUid(){
    // Nos va a generar una promesa, y la constante la va a capturar
    const user = await this.auth.currentUser;

    /*
      Si el usuario no respeta la estructura de la interfaz /
      Si tuvo problemas para el registro -> ej.: mal internet
    */
    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }

  //funcion que busca "usuarios" cuyo correo electronico coincida con el valor proporcionado
  obtenerUsuario(email: string){
    return this.servicioFirestore.collection('usuarios', ref=>ref.where('email', '==',email)).get().toPromise()
  }

  obtenerRol(uid: string): Observable < string | null>{
    /* retornamos del servicio de firestore la coleccion de usuario, buscando por UID
       observamos cambios en valores , mapeamos al documento de 'usuario e identificamos'
       el atributo de rol (aun si este es nulo) 
    */ 
    return this.servicioFirestore.collection('usuarios').doc(uid).valueChanges()
    .pipe(map((usuario: any)=> usuario ? usuario.rol : null))
  }

  //obtenemos el rol de la primera funcion y lo asigna a la propiedad privada local
  enviaRolUsuario(rol : string){
    this.rolUsuario = rol
  }

  //obtiene el rol y los retronamos (ya sean alfanumericos o nulos)
  obtenerRolUsuario(): string | null{
   return this.rolUsuario 
  }
}