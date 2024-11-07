import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { CarritoService } from '../../servicio/carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/service/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  productos: Pedido[] =[]

  constructor(
    public servicioCarrito: CarritoService,
    public servicoAuth: AuthService
  ){}

  //obtenemos el rol e id del usuaruis para ver que este lgueada correctamente
  ngOnInit(){
    this.servicoAuth.obtenerUid().then(uid=>{
      if(uid){
        this.servicoAuth.obtenerRol(uid).subscribe(rol=>{
          if(rol === 'usuario'){
            //inicializamos el carrito
            this.servicioCarrito.iniciarCart()

            this.servicioCarrito.obtenerCarrito().subscribe(producto =>
              this.productos = producto
            )
          }
        })
      }
    })
  }

  
}
