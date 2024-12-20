import { Injectable } from '@angular/core';
import { CrudService } from '../../admin/serices/crud.service';
import { AuthService } from '../../autentificacion/service/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedido } from 'src/app/models/pedido';
import { map } from 'rxjs'
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  pedido:Pedido ={
    idpedido:'',
    producto:{
      idProducto:'',
      nombre:'',
      precio:0,
      descripcion:'',
      categoria:'',
      imagen:'',
      alt:'',
      stock:0
    },
    cantiadad:0,
    total:0
  }
  private pedidosColeccion: AngularFirestoreCollection<Pedido>
  private uid: string | null=null

  constructor(
    private servicioCrud: CrudService,
    private servicioAuth: AuthService,
    private servicioFirestore: AngularFirestore,
    public servicioRutas: Router
  ) { 
    //creamos una subcoleccion dentro de la coleccion de usuarios y le damos ese valor a pedidosColeccion
    this.pedidosColeccion = this.servicioFirestore.collection(`usuarios/`)
  }
  //funcion para inicialicar el carrito 
  iniciarCart(){
    this.servicioAuth.obtenerUid().then(uid =>{
      //obtenemos el id del ususario para la coleccion
      this.uid = uid
      if(this.uid === null){
        console.error('no se obtuvo el uid. intente iniciar sesion')

        this.servicioRutas.navigate(['/inicio-sesion'])
      }else{
        this.pedidosColeccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`)
      }
    })
  }

  obtenerCarrito(){
    return this.pedidosColeccion.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  crearPedido(producto: Producto, stock: number){
    try {
      //creamos un id para el pedido que sera subido
      const idpedido = this.servicioFirestore.createId()
      //remplazamos los valores de pedido por los valores que obtuvimos
      this.pedido.idpedido = idpedido
      this.pedido.producto= producto
      this.pedido.cantiadad= stock
      this.pedido.total = producto.precio*stock

      this.pedidosColeccion.doc(idpedido).set(this.pedido)
    } catch (error) {
      Swal.fire({
        title:'¡oh no !',
        text:'ha ocurrido un error al subir su producto',
        icon:'error'
      })
    }
  }

  borrarPedido(pedido:Pedido){
    try{
      this.pedidosColeccion.doc(pedido.idpedido).delete()

      Swal.fire({
        text:'ha borrado su pedido con exsito',
        icon:'info'
      })
    }catch(error){
      Swal.fire({
        text:'ha ocurrido un erro: n/'+error,
        icon:'error'
      })
    }
  }
}
