import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/serices/crud.service';
import { CarritoService } from 'src/app/modules/carrito/servicio/carrito.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  coleccionProductos: Producto[] = []

  productoSeleccionado! : Producto

  modalVisible: boolean = false

  compraVisible: boolean = false

  @Input() productoReciente: string=''

  
  @Output() productoAgregado = new EventEmitter<Producto>;

  stock:number=0

  constructor (
    public servicioCrud: CrudService,
    public servicioCarrito: CarritoService
  ){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto =>{
      this.coleccionProductos = producto
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true

    this.productoSeleccionado = info
  }

  agreagarProducto(info:Producto){
    this.productoAgregado.emit(info)

    this.compraVisible = true

    const stockDecaado = Math.trunc(this.stock)
    //contrala el stock que desea el comprador
    if(stockDecaado<=0 || stockDecaado> info.stock){
      Swal.fire({
        title:'error al agregar el producto',
        text:'el stock ingresado no es valido, por favor ingresar un valor valido ',
        icon:'error'
      })
    }else{
      this.servicioCarrito.crearPedido(info,stockDecaado)
    }
  }
}
