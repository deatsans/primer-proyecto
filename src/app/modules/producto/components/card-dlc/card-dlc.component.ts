import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';

import { CrudService } from 'src/app/modules/admin/serices/crud.service';


@Component({
  selector: 'app-card-dlc',
  templateUrl: './card-dlc.component.html',
  styleUrls: ['./card-dlc.component.css']
})
export class CardDlcComponent {
  coleccionProductos: Producto[] = []
  coleccionDlc: Producto[] = []

  productoSeleccionado!: Producto
  modalVisible: boolean = false

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto =>{
      this.coleccionProductos = producto

      this.mostrarProducto()
    })
  }

  mostrarProducto(){
    this.coleccionProductos.forEach(producto =>{
      if (producto.categoria === "Dlc") {
        this.coleccionDlc.push(producto)
      }
    })
  }

  mortarVer(info: Producto){
    this.modalVisible = true
    
    this.productoSeleccionado = info
  }
}
