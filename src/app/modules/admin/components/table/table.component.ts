import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../serices/crud.service';
import { FormControl,FormGroup,Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionProducto: Producto[]=[]

  modalVicubleProducto: boolean = false

  productoSeleccionado!: Producto


  producto = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Precio: new FormControl(0, Validators.required),
    Descripcion: new FormControl('', Validators.required),
    Categoria: new FormControl('', Validators.required),
    Imagen: new FormControl('', Validators.required),
    Alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto =>{
      this.coleccionProducto= producto
    })
  }

 async agregarProducto(){
  if(this.producto.valid){
    let nuevoProducto: Producto={
      idProducto:'',
      Nombre: this.producto.value.Nombre!,
      Descripcion: this.producto.value.Descripcion!,
      Precio: this.producto.value.Precio!,
      Categoria: this.producto.value.Categoria!,
      Imagen: this.producto.value.Imagen!,
      Alt: this.producto.value.Alt!
    }
    await this.servicioCrud.crearProducto(nuevoProducto)
    .then(producto =>{
      alert("Ha agregado un nuevo producto :)")
    })
    .catch(error =>{
      alert("Hubo un problema al agregar un nuevo producto :(")
    })
  }
 }

 mostrarBorrar(productoSeleccionado: Producto){
  this.modalVicubleProducto = true
  this.productoSeleccionado = productoSeleccionado
 }

 borrarProducto(){
  this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto)
  .then(respuesta =>{
    alert("el producto se ha elimidao correctamnete")
  })
  .catch(error =>{
    alert("no se apodido eliminar correctamente \n"+error)
  })
 }
}
