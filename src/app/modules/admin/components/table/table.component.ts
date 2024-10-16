import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../serices/crud.service';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionProducto: Producto[] = []

  modalVicubleProducto: boolean = false

  productoSeleccionado!: Producto

  nombreImagen!: string

  imagen!: string


  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    //imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProducto = producto
    })
  }

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        imagen: '',
        alt: this.producto.value.alt!
      }

      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "producto")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)

            .then(url => {
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert("Ha agregado un nuevo producto :)")
                  this.producto.reset()
                })
                .catch(error => {
                  alert("Hubo un problema al agregar un nuevo producto :(")
                })
              this.producto.reset()
            })
        })

    }
  }

  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVicubleProducto = true
    this.productoSeleccionado = productoSeleccionado
  }

  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        alert("el producto se ha elimidao correctamnete")
      })
      .catch(error => {
        alert("no se apodido eliminar correctamente \n" + error)
      })
  }

  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado

    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      //imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

  editarProducto() {
    let datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!
    }
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "producto")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              datos.imagen = url

              this.actualizarProducto(datos)

              this.producto.reset()
            })
            .catch(error => {
              alert("hubo un problam al subir la imagen :( \n" + error)
              this.producto.reset()
            })
        })
    } else {
      this.actualizarProducto(datos)
    }



  }

  actualizarProducto(datos: Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("el producto fue modificado con exito")
        this.producto.reset()
      })
      .catch(error => {
        alert("hubo un error al modificar el producto")
        this.producto.reset()
      })
  }

  cargarImagen(event: any) {
    let archivo = event.target.files[0]

    let reader = new FileReader()

    if (archivo != undefined) {
      reader.readAsDataURL(archivo)
      // definimos que hacemos con la funcion flecha
      reader.onloadend = () => {
        let url = reader.result

        if (url != null) {
          this.nombreImagen = archivo.name

          this.imagen = url.toString()
        }
      }
    }
  }

}
