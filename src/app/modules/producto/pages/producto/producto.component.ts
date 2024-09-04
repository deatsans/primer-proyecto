import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import swal from 'sweetalert2'

@Component({
  
  selector: 'app-producto, app-card',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  product: string=''

  productoCarrusel: Producto [] = []

  productoAnadido(producto:Producto){
    this.product= `${producto.nombre} : $${producto.precio}`

    try{
      this.productoCarrusel.push(producto)

      swal.fire({
        title:"bien",
        text:"ha añadido este producto con exito",
        icon:"info"
      })
    } catch(error){
      swal.fire({
        title:"que histe boludo",
        text:"ha ocurrido un error\n"+error,
        icon:"error"
      })
    }
  }
}
