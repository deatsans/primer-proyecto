import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/serices/crud.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  coleccionProductos: Producto[] = []

  productoSeleccionado! : Producto

  modalVisible: boolean = false

  constructor (public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto =>{
      this.coleccionProductos = producto
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true

    this.productoSeleccionado = info
  }
}
